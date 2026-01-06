# Compress all PNG images to reduce file size
Get-ChildItem -Path "D:\PROJECTS\eubiosis\public\images" -Recurse -Include "*.png" | ForEach-Object {
    $file = $_.FullName
    $size = [math]::Round($_.Length / 1MB, 2)
    
    if ($size -gt 0.5) {
        Write-Host "Compressing $($_.Name) ($size MB)..."
        sharp input "$file" output "$file" --quality 80
    }
}

Write-Host "Compression complete!"
