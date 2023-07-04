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
    rl.question('\n\nPressione qualquer tecla para invocar os espíritos dos artefatos...', () => {
      resolve();
    });
  });
}

async function promptRepositoryName() {
  return new Promise((resolve) => {
    rl.question('Digite o nome do Usuário ou Organização assombrada: ', (answer) => {
      resolve(answer);
    });
  });
}

class GithubRepository {
  constructor(owner, token){
    // require('dotenv').config();
    this.owner = owner;
    this.token = process.env.GITHUB_TOKEN || token;
    this.headers = {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${this.token}`,
    }
  };

  async getRepositories() {
    const url = `https://api.github.com/orgs/${this.owner}/repos`;
    const headers = this.headers;
    const response = await axios.get(url, { headers: this.headers })
    return response.data;
  }

  async deleteArtifact(repositoryName, artifactId) {
    const url = `https://api.github.com/repos/${this.owner}/${repositoryName}/actions/artifacts/${artifactId}`;
    await axios.delete(url, { headers: this.headers })
  }

  async getArtifacts(repositoryName) {
    const url = `https://api.github.com/repos/${this.owner}/${repositoryName}/actions/artifacts`;
    const response = await axios.get(url, {headers: this.headers})
    return response.data.artifacts;
  }
}

async function drawGhost() {
    const ghost = [
      "            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀",
      "            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣾⣿⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀",
      "            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⠿⢿⣿⣿⣿⣿⣆⠀⠀",
      "            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⠁⠀⠿⢿⣿⡿⣿⣿⡆⠀",
      "            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣦⣤⣴⣿⠃⠀⠿⣿⡇⠀",
      "            ⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⡿⠋⠁⣿⠟⣿⣿⢿⣧⣤⣴⣿⡇⠀",
      "            ⠀⠀⠀⢀⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠘⠁⢸⠟⢻⣿⡿⠀⠀",
      "            ⠀⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣴⣇⢀⣤⠀⠀⠀⠀⠘⣿⠃⠀⠀",
      "            ⠀⠀⠀⠀⢈⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣴⣿⢀⣴⣾⠇⠀⠀⠀",
      "            ⠀⣀⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀",
      "            ⠀⠉⠉⠉⠉⣡⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀",
      "            ⠀⠀⠀⣠⣾⣿⣿⣿⣿⡿⠟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀",
      "            ⠀⣴⡾⠿⠿⠿⠛⠋⠉⠀⢸⣿⣿⣿⣿⠿⠋⢸⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀",
      "            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⡿⠟⠋⠁⠀⠀⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      "            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    ];
  
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < ghost.length; i++) {
      console.log(ghost[i]);
      await delay(150); // Atraso de 100ms entre as linhas
    }

  }

async function main() {
  await drawGhost();
  rl.write('\nBem Vindo à ferramenta Artifact Exorcist! 👻🧹💾\nDesenvolvido por @gusflopes: https://github.com/gusflopes\n')
  await pressAnyKeyToContinue()

  const owner = await promptRepositoryName();
  // const githubRepository = new GithubRepository(owner, token);
  const githubRepository = new GithubRepository(owner);

  try {
    const repositories = await githubRepository.getRepositories();
    console.log(`Verificamos que você tem um total de ${repositories.length} repositórios assombrados! Vamos revelar todos eles:`);
    await pressAnyKeyToContinue()

    let result = [];
    let totalArtifacts = 0;

    for (const repository of repositories) {
      console.log(`Repositório assombrado: ${repository.name}`);
      const artifacts = await githubRepository.getArtifacts(repository.name);
      console.log(`Total de artefatos do Repositório Assombrado [${repository.name}]: ${artifacts.length}`);
      console.log(`-----------👻-----------`)
      totalArtifacts += artifacts.length;
      result.push({ repositoryName: repository.name, artifacts: artifacts });
    }

    console.log("\n\nMistérios se desdobram diante de nós! Aqui estão todos os artefatos encontrados. 👻🧹💾\n\n")
    await pressAnyKeyToContinue()
    console.log(result);
    console.log(`\nEncontramos um total de ${totalArtifacts} artefatos assustadores para exorcizar... 🧨💥\n\n`);
  
    if (totalArtifacts > 0) {
      rl.question('Deseja exorcizar todos os artefatos malignos? (Y/N): ', async (answer) => {
        if (answer.toLowerCase() === 'y') {
          console.log('Preparando os feitiços e encantamentos...');
          const deletePromises = [];
  
          for (const repository of result) {
            for (const artifact of repository.artifacts) {
              console.log(`Executando exorcismo no Artefato: ${artifact.id} - ${artifact.name}`);
              deletePromises.push(githubRepository.deleteArtifact(repository.repositoryName, artifact.id));
            }
          }
  
          try {
            await Promise.all(deletePromises);
            console.log('Os artefatos foram exorcizados com sucesso. 🪄✨');
            await pressAnyKeyToContinue()
          } catch (error) {
            console.error('Ocorreu um erro durante o exorcismo...', error);
          }
        } else {
          console.log('Os artefatos continuam assombrados... 👻');
          await pressAnyKeyToContinue()
        }
      });
    } else {
      console.log('Nenhum artefato maligno foi encontrado. A tranquilidade reina! 🌟😌\n');
    }

    console.log('\nObrigado por usar essa ferramenta de exorcismo de artefatos! 👍\n');
    console.log('\nNão esqueça de deixar uma ⭐️ no repositório: https://github.com/gusflopes/artifact-exorcist 👻🧹💾\n');
    await pressAnyKeyToContinue()
    
    rl.close();
    
  } catch (error) {
    console.error(`\nUm espírito maligno causou um erro durante a requisição: ${error}`);
  }
}

main();
