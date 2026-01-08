const http = require('http');

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MWQ3OTM1OC04M2FkLTQ3NGQtYWI3OC1lODM1NjQwY2ZkZTciLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY3ODg4MTYzfQ.TOuWryIyX5hrn1QAzBQpvKyHd6P3pkVmkwlqkLr2ZJk";
const HOST = 'localhost';
const PORT = 5678;

function getWorkflows() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: HOST,
            port: PORT,
            path: '/api/v1/workflows',
            method: 'GET',
            headers: { 'X-N8N-API-KEY': API_KEY }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (c) => data += c);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data).data);
                } catch (e) {
                    reject(e);
                }
            });
        });
        req.end();
    });
}

function deleteWorkflow(id) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: HOST,
            port: PORT,
            path: `/api/v1/workflows/${id}`,
            method: 'DELETE',
            headers: { 'X-N8N-API-KEY': API_KEY } // Usually DELETE doesn't need content-type, but headers are needed
        };

        const req = http.request(options, (res) => {
            if (res.statusCode === 200 || res.statusCode === 204) {
                resolve(true);
            } else {
                reject(`Status ${res.statusCode}`);
            }
        });
        req.end();
    });
}

async function wipe() {
    console.log("Fetching workflows to delete...");
    try {
        const workflows = await getWorkflows();
        console.log(`Found ${workflows.length} workflows. Deleting...`);

        for (const w of workflows) {
            try {
                process.stdout.write(`Deleting ${w.name} (${w.id})... `);
                await deleteWorkflow(w.id);
                console.log("✅");
            } catch (e) {
                console.log(`❌ Error: ${e}`);
            }
            // slight delay
            // await new Promise(r => setTimeout(r, 50)); 
        }
        console.log("Wipe complete.");
    } catch (e) {
        console.error("Error listing workflows:", e);
    }
}

wipe();
