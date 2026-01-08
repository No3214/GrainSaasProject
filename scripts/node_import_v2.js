const fs = require('fs');
const path = require('path');
const http = require('http');

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MWQ3OTM1OC04M2FkLTQ3NGQtYWI3OC1lODM1NjQwY2ZkZTciLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY3ODg4MTYzfQ.TOuWryIyX5hrn1QAzBQpvKyHd6P3pkVmkwlqkLr2ZJk";
const HOST = 'localhost';
const PORT = 5678;

const templatesDir = path.join(__dirname, '..', 'templates');

// Helper to post data
function postWorkflow(workflowData, filename) {
    return new Promise((resolve, reject) => {
        // Clean up data for import
        const nodes = workflowData.nodes || [];
        console.log(`Payload check: ${filename} has ${nodes.length} nodes.`);

        const payload = JSON.stringify({
            name: workflowData.name,
            nodes: workflowData.nodes || [],
            connections: workflowData.connections || {},
            settings: workflowData.settings || {},
            // tags: workflowData.tags // Removing this as it causes "read-only" error
        });

        const options = {
            hostname: HOST,
            port: PORT,
            path: '/api/v1/workflows',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-N8N-API-KEY': API_KEY,
                'Content-Length': Buffer.byteLength(payload)
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => { responseData += chunk; });
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve({ status: 'success', name: workflowData.name });
                } else {
                    reject({ status: 'error', file: filename, code: res.statusCode, msg: responseData });
                }
            });
        });

        req.on('error', (e) => {
            reject({ status: 'error', file: filename, msg: e.message });
        });

        req.write(payload);
        req.end();
    });
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.json')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });
    return arrayOfFiles;
}

async function run() {
    console.log("Starting bulk import...");
    const files = getAllFiles(templatesDir);
    let success = 0;
    let fail = 0;

    for (const file of files) {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const json = JSON.parse(content);
            console.log(`Importing: ${path.basename(file)}...`);

            await postWorkflow(json, path.basename(file));
            console.log(`✅ OK: ${json.name}`);
            success++;
        } catch (error) {
            console.error(`❌ ERROR [${error.file}]:`, error.msg || error);
            fail++;
        }
        // Small delay to be gentle on server
        await new Promise(r => setTimeout(r, 200));
    }

    console.log("\n=============================");
    console.log(`Total: ${files.length}`);
    console.log(`Success: ${success}`);
    console.log(`Failed: ${fail}`);
    console.log("=============================");
}

run();
