$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$siteUrl = "http://127.0.0.1:5000/"

Set-Location -LiteralPath $repoRoot

Write-Host "Starting Rose Quartz local Vite preview..."
Write-Host ""

$npm = Get-Command npm.cmd -ErrorAction SilentlyContinue
if (-not $npm) {
  Write-Host "npm was not found. Install Node.js, then run Start-Local-Site.cmd again."
  Read-Host "Press Enter to close"
  exit 1
}

if (-not (Test-Path -LiteralPath "node_modules")) {
  Write-Host "Installing dependencies first. This may take a minute..."
  & npm.cmd install
  if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Dependency install failed."
    Read-Host "Press Enter to close"
    exit $LASTEXITCODE
  }
}

$escapedRoot = $repoRoot.Path.Replace("'", "''")
$serverCommand = "Set-Location -LiteralPath '$escapedRoot'; npm.cmd run dev; Read-Host 'Press Enter to close this Vite window'"
Start-Process powershell.exe -ArgumentList @(
  "-NoExit",
  "-NoProfile",
  "-ExecutionPolicy",
  "Bypass",
  "-Command",
  $serverCommand
)

Write-Host "Waiting for Vite at $siteUrl ..."
$deadline = (Get-Date).AddSeconds(30)
$ready = $false

while ((Get-Date) -lt $deadline) {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $siteUrl -TimeoutSec 2
    if ($response.StatusCode -lt 500) {
      $ready = $true
      break
    }
  } catch {
    Start-Sleep -Milliseconds 500
  }
}

if (-not $ready) {
  Write-Host "Could not confirm Vite is ready yet. Opening the browser anyway."
}

Start-Process $siteUrl
Write-Host "Opened $siteUrl"
Write-Host "Use the Vite window to stop or restart the local server."
