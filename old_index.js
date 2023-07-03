require('dotenv').config();
const axios = require('axios');

console.log("Hello World!");

  // Parâmetros
  const owner = 'NETBROKERS';
  const repo = 'N3B_Timesheet.UI';
  // const workflowId = 'id-do-workflow';
  const token = process.env.GITHUB_TOKEN;
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `Bearer ${token}`,
  };


async function deleteArtifact(artifact) {
  const url = `https://api.github.com/repos/${owner}/${repo}/actions/artifacts/${artifact.id}`;
  await axios.delete(url, { headers })
}

async function main() {
  const url = `https://api.github.com/repos/${owner}/${repo}/actions/artifacts`;
  
  try {
    const response = await axios.get(url, { headers })

    const artifacts = response.data.artifacts;
    console.log(`Total de artefatos: ${artifacts.length}`);
  
    for (const artifact of artifacts) {
      console.log(`Deletando Artefato: ${artifact.id} - ${artifact.name} - ${artifact.archive_download_url}`);
      deleteArtifact(artifact);
    }
  
    
  } catch (error) {
    console.error(`Erro na requisição: ${error}`);
  }
}

main();


