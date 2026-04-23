# Use a mirror to avoid github connection resets
$installerPath = "$env:TEMP\Git-Installer.exe"
$downloadUrl = "https://npmmirror.com/mirrors/git-for-windows/v2.44.0.windows.1/Git-2.44.0-64-bit.exe"

Write-Host "Downloading Git installer from mirror..."
try {
    Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath -UseBasicParsing
    Write-Host "Download successful."
} catch {
    Write-Host "Failed to download Git. Error: $($_.Exception.Message)"
    exit 1
}

Write-Host "Starting Git installation in silent mode..."
Start-Process -FilePath $installerPath -ArgumentList "/VERYSILENT", "/NORESTART", "/NOCANCEL", "/SP-", "/CLOSEAPPLICATIONS", "/RESTARTAPPLICATIONS", "/COMPONENTS=icons,ext\reg\shellhere,assoc,assoc_sh" -Wait -NoNewWindow

Write-Host "Git installation completed. Removing installer..."
Remove-Item -Path $installerPath -Force

Write-Host "Adding Git to Path just in case..."
$env:Path += ";C:\Program Files\Git\cmd"
[Environment]::SetEnvironmentVariable("Path", $env:Path, [EnvironmentVariableTarget]::User)

Write-Host "Installation script finished."
