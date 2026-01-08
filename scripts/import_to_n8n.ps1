$apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MWQ3OTM1OC04M2FkLTQ3NGQtYWI3OC1lODM1NjQwY2ZkZTciLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY3ODg4MTYzfQ.TOuWryIyX5hrn1QAzBQpvKyHd6P3pkVmkwlqkLr2ZJk"
$baseUrl = "http://localhost:5678/api/v1"
$headers = @{
    "X-N8N-API-KEY" = $apiKey
    "Content-Type"  = "application/json"
}

# Get all workflow files
$templateDirs = @(
    "templates\ai-automation",
    "templates\local-seo",
    "templates\real-estate",
    "templates\general",
    "templates\hospitality",
    "templates\agency-revops",
    "templates\ops-hr",
    "templates\seo-marketing",
    "templates\pro",
    "templates\content-factory",
    "templates\seo-intelligence"
)

$successCount = 0
$errorCount = 0
$errors = @()

foreach ($dir in $templateDirs) {
    if (Test-Path $dir) {
        $files = Get-ChildItem -Path $dir -Filter "*.json" -ErrorAction SilentlyContinue
        foreach ($file in $files) {
            try {
                $content = Get-Content $file.FullName -Raw
                $workflow = $content | ConvertFrom-Json
                
                # Prepare workflow for import
                $importData = @{
                    name        = $workflow.name
                    nodes       = $workflow.nodes
                    connections = $workflow.connections
                    settings    = $workflow.settings
                }
                
                $body = $importData | ConvertTo-Json -Depth 20 -Compress
                
                $response = Invoke-RestMethod -Uri "$baseUrl/workflows" -Method POST -Headers $headers -Body $body -ErrorAction Stop
                
                Write-Host "[OK] $($workflow.name)" -ForegroundColor Green
                $successCount++
            }
            catch {
                Write-Host "[ERROR] $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
                $errors += "$($file.Name): $($_.Exception.Message)"
                $errorCount++
            }
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Import Complete!" -ForegroundColor Cyan
Write-Host "Success: $successCount" -ForegroundColor Green
Write-Host "Errors: $errorCount" -ForegroundColor $(if ($errorCount -gt 0) { "Red" } else { "Green" })
Write-Host "========================================" -ForegroundColor Cyan
