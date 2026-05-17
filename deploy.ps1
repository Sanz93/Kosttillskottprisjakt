$ErrorActionPreference = "Stop"

$commit_msg = Read-Host "Commit-meddelande"
if ([string]::IsNullOrWhiteSpace($commit_msg)) { $commit_msg = "update" }

Write-Host "==> Bygger sidor..." -ForegroundColor Cyan
node build-all.js
if (-not $?) { Write-Host "Build misslyckades." -ForegroundColor Red; exit 1 }

if (Test-Path ".git") {
    Write-Host "==> Git commit + push..." -ForegroundColor Cyan
    git add .
    git commit -m $commit_msg
    if ($?) { git push }
} else {
    Write-Host "Ingen .git-mapp hittad – hoppar över git-steg." -ForegroundColor Yellow
}

Write-Host "==> Deploy till Cloudflare Pages..." -ForegroundColor Cyan
wrangler pages deploy . --project-name=kosttillskottprisjakt --branch=main --commit-dirty=true
