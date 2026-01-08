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
            headers: {
                'X-N8N-API-KEY': API_KEY,
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => { responseData += chunk; });
            res.on('end', () => {
                try {
                    const json = JSON.parse(responseData);
                    resolve(json.data);
                } catch (e) {
                    reject(e);
                }
            });
        });
        req.end();
    });
}

async function checkAll() {
    console.log("Checking all workflows...");
    try {
        const workflows = await getWorkflows();
        console.log(`Found ${workflows.length} workflows.`);

        const emptyWorkflows = [];
        const fullWorkflows = [];

        workflows.forEach(w => {
            // Check if nodes is empty array or empty string or simplified object
            let nodeCount = 0;
            if (Array.isArray(w.nodes)) {
                nodeCount = w.nodes.length;
            } else if (typeof w.nodes === 'string') {
                // confusing API behavior previously seen
                nodeCount = w.nodes.length > 5 ? 1 : 0;
            } else if (typeof w.nodes === 'object') {
                nodeCount = Object.keys(w.nodes).length;
            }

            if (nodeCount === 0) {
                emptyWorkflows.push(w.name);
            } else {
                fullWorkflows.push({ name: w.name, count: nodeCount });
            }
        });

        console.log("\n❌ EMPTY WORKFLOWS (Need Fix):");
        if (emptyWorkflows.length === 0) console.log("None! All look good.");
        emptyWorkflows.forEach(name => console.log(`- ${name}`));

        console.log("\n✅ Valid Workflows: " + fullWorkflows.length);

    } catch (e) {
        console.error("Error:", e);
    }
}

checkAll();
