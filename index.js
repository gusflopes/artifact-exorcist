require('dotenv').config();
const axios = require('axios');
const readline = require('readline');

// Cria a interface de leitura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Cria uma função para aguardar a entrada do usuário
function pressAnyKeyToContinue() {
  return new Promise((resolve) => {
    rl.question('\n\nPressione qualquer tecla para continuar...', () => {
      resolve();
    });
  });
}

async function promptRepository() {
  return 'NETBROKERS'
}

class GithubRepository {
  constructor(owner, token){
    this.owner = owner;
    this.token = process.env.GITHUB_TOKEN;
    this.headers = {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${token}`,
    }
  };

  async getRepositories() {
    const url = `https://api.github.com/orgs/${this.owner}/repos`;
    const response = await axios.get(url, { headers })
    return response.data;
  }

  async deleteArtifact(repositoryName, artifactId) {
    const url = `https://api.github.com/repos/${this.owner}/${repositoryName}/actions/artifacts/${artifactId}`;
    await axios.delete(url, { headers })
  }

  async getArtifacts(repositoryName) {
    const url = `https://api.github.com/repos/${this.owner}/${repositoryName}/actions/artifacts`;
    const response = await axios.get(url, { headers })
    return response.data.artifacts;
  }
}

async function main() {
  rl.write('\nBem Vindo à ferramenta de Limpeza de Artefatos do GitHub!\nDesenvolvido por @gusflopes: https://github.com/gusflopes\n')
  await pressAnyKeyToContinue()

  var owner = await promptRepository();
  const githubRepository = new GithubRepository(owner, process.env.GITHUB_TOKEN);

  try {
    const repositories = await githubRepository.getRepositories();
    console.log(`Verificamos que você tem um total de ${repositories.length} repositórios! Vamos listar todos eles:`);
    await pressAnyKeyToContinue()

    let result = [];
    let totalArtifacts = 0;

    for (const repository of repositories) {
      console.log(`Repositório: ${repository.name}`);
      const artifacts = await githubRepository.getArtifacts(repository.name);
      console.log(`Total de artefatos do Repositório [${repository.name}]: ${artifacts.length}`);
      console.log(`------------------`)
      totalArtifacts += artifacts.length;
      result.push({ repositoryName: repository.name, artifacts: artifacts });
    }

    console.log("\n\nCerto! Agora vamos listar todos os artefatos encontrados.\n\n")
    await pressAnyKeyToContinue()
    console.log(result);
    console.log(`\nEncontramos um total de ${totalArtifacts} artefatos conforme listado acima.\n\n`);
  
    if (totalArtifacts > 0) {
      rl.question('Deseja deletar todos os artefatos? (Y/N): ', async (answer) => {
        if (answer.toLowerCase() === 'y') {
          console.log('Deletando os artefatos...');
          const deletePromises = [];
  
          for (const repository of result) {
            for (const artifact of repository.artifacts) {
              console.log(`Deletando Artefato: ${artifact.id} - ${artifact.name}`);
              deletePromises.push(githubRepository.deleteArtifact(repository.repositoryName, artifact.id));
            }
          }
  
          try {
            await Promise.all(deletePromises);
            console.log('Todos os artefatos foram deletados com sucesso.');
            await pressAnyKeyToContinue()
          } catch (error) {
            console.error('Ocorreu um erro ao deletar os artefatos:', error);
          }
        } else {
          console.log('Nenhum artefato será deletado.');
          await pressAnyKeyToContinue()
        }
      });
    }

    console.log('Obrigado por usar essa ferramenta! 👍\n');
    console.log('Não esqueça de deixar uma ⭐ no repositório: https://github.com/gusflopes/github-tools 👀\n');
    await pressAnyKeyToContinue()
    
    rl.close();
    
  } catch (error) {
    console.error(`Erro na requisição: ${error}`);
  }
}

main();
