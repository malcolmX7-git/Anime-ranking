$files = Get-ChildItem -Path .\HTML -Filter '*.html' -Recurse
$changed = @()
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $orig = $content

    # Clean tokens
    $content = $content -replace '\$2<script', ''
    $content = $content -replace '`n<script', '<script'
    $content = $content -replace '\`n', "`n"

    # Encoding residues
    $content = $content -replace 'â€™','\''
    $content = $content -replace 'Ã©','é'
    $content = $content -replace 'Ã¨','è'
    $content = $content -replace 'Ã ','à'
    $content = $content -replace 'Â ',' '
    $content = $content -replace 'ââ','\''

    # Minified CSS
    $content = $content -replace 'href="..\/CSS\/style\.css"','href="../CSS/style.min.css"'
    $content = $content -replace 'href="..\/CSS\/anime\.css"','href="../CSS/anime.min.css"'
    $content = $content -replace 'href="..\/CSS\/accueil\.css"','href="../CSS/accueil.min.css"'
    $content = $content -replace 'href="..\/CSS\/classement\.css"','href="../CSS/classement.min.css"'

    # Remove any existing interactions.js script tags
    $content = [regex]::Replace($content, '<script[^>]*interactions\.js[^>]*>\s*</script>', '', 'IgnoreCase')

    # Ensure interactions.js before </body>
    if ($content -notmatch 'interactions\.js') {
        $content = $content -replace '</body>', "`n<script src=\"../JS/interactions.js\" defer></script>`n</body>"
    }

    # Fix empty alt attributes via regex evaluator
    $pattern = '<img([^>]*?)src=\"([^\"]+)\"([^>]*?)alt=\"\"'
    $content = [regex]::Replace($content, $pattern, {
        param($m)
        $prefix = $m.Groups[1].Value
        $src = $m.Groups[2].Value
        $suffix = $m.Groups[3].Value
        $name = [System.IO.Path]::GetFileNameWithoutExtension($src) -replace '[_-]',' '
        if ([string]::IsNullOrWhiteSpace($name)) { $name = 'image' }
        return "<img$prefix