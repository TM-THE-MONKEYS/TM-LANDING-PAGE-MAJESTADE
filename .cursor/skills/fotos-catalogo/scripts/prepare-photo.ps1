param(
  [Parameter(Mandatory = $true)]
  [string]$Source,
  [Parameter(Mandatory = $true)]
  [string]$Destination
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $Source)) {
  Write-Error "SOURCE_MISSING $Source"
  exit 1
}

$destDir = Split-Path -Parent $Destination
if ($destDir -and -not (Test-Path -LiteralPath $destDir)) {
  New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

$magick = Get-Command magick -ErrorAction SilentlyContinue
if ($magick) {
  & magick $Source -auto-orient -strip -resize "1600x1600>" -quality 82 -sampling-factor 4:2:0 $Destination
  if ($LASTEXITCODE -ne 0) {
    Write-Error "MAGICK_FAILED $Source"
    exit $LASTEXITCODE
  }
  Write-Output "PREPARED $Destination"
  exit 0
}

Copy-Item -LiteralPath $Source -Destination $Destination -Force
Write-Output "COPIED_WITHOUT_EDIT $Destination"
