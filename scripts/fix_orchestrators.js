const http = require('http');
const fs = require('fs');
const path = require('path');

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MWQ3OTM1OC04M2FkLTQ3NGQtYWI3OC1lODM1NjQwY2ZkZTciLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY3ODg4MTYzfQ.TOuWryIyX5hrn1QAzBQpvKyHd6P3pkVmkwlqkLr2ZJk";
const HOST = 'localhost';
const PORT = 5678;

const FILES_TO_FIX = [
    { name: "Grain Agentic AI Orchestrator v1", path: "templates/ai-automation/Grain_Agentic_AI_Orchestrator_v1.json" },
    { name: "Grain Agentic AI Orchestrator v2 Pro", path: "templates/pro/Grain_Agentic_AI_Orchestrator_v2_Pro.json" }
];

function request(method, endpoint, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: HOST,
            port: PORT,
            path: '/api/v1' + endpoint,
            method: method,
            headers: {
                'X-N8N-API-KEY': API_KEY,
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) { resolve(data); }
                } else {
                    reject(`Error ${res.statusCode}: ${data}`);
                }
            });
        });
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

function readFile(relativePath) {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '..', relativePath), 'utf8'));
}

async function fix() {
    console.log("Starting Targeted Fix for Orchestrators...");

    try {
        // 1. Get List
        const workflows = await request('GET', '/workflows');
        const allWorkflows = workflows.data;

        for (const target of FILES_TO_FIX) {
            console.log(`\nProcessing: ${target.name}`);

            // 2. Find and Delete Existing
            const existing = allWorkflows.filter(w => w.name === target.name);
            for (const w of existing) {
                console.log(`- Deleting existing ID: ${w.id}`);
                await request('DELETE', `/workflows/${w.id}`);
            }

            // 3. Read Source and Prepare Payload
            const sourceData = readFile(target.path);
            console.log(`- Source file has ${sourceData.nodes.length} nodes.`);

            // IMPORTANT: n8n API sometimes wants 'nodes' as object, sometimes array.
            // For CREATE, it's definitely array.
            // We strip 'id' to let n8n generate a new one, but keep node IDs.
            const payload = {
                name: sourceData.name,
                nodes: sourceData.nodes,
                connections: sourceData.connections,
                settings: sourceData.settings || {}
            };

            // 4. Create New
            console.log(`- Creating new workflow...`);
            const created = await request('POST', '/workflows', payload);

            // 5. Verify Response
            const createdNodeCount = created.nodes ? created.nodes.length : 0;
            console.log(`✅ Created Workflow ID: ${created.id}`);
            console.log(`✅ Server returned ${createdNodeCount} nodes.`);

            if (createdNodeCount === 0) {
                console.error(`⚠️ WARNING: Server returned 0 nodes! Payload might be rejected.`);
            }
        }
    } catch (e) {
        console.error("FATAL ERROR:", e);
    }
}

fix();
