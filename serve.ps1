# Petit serveur HTTP statique (sans dépendance) pour prévisualiser le site localement.
param([int]$Port = 8080)

$root = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$Port/"

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css"
  ".js"   = "application/javascript"
  ".svg"  = "image/svg+xml"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".png"  = "image/png"
  ".ico"  = "image/x-icon"
  ".json" = "application/json"
  ".yml"  = "text/yaml"
  ".yaml" = "text/yaml"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  try {
    $request = $context.Request
    $response = $context.Response
    $response.KeepAlive = $false

    $path = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath)
    if ($path -eq "/") { $path = "/index.html" }
    $filePath = Join-Path $root ($path.TrimStart("/"))

    if ((Test-Path $filePath -PathType Container) -and (Test-Path (Join-Path $filePath "index.html"))) {
      $filePath = Join-Path $filePath "index.html"
    }

    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath)
      $contentType = $mimeTypes[$ext]
      if (-not $contentType) { $contentType = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $response.ContentType = $contentType
      $response.ContentLength64 = [int64]$bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $response.StatusCode = 404
      $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
      $response.ContentLength64 = [int64]$notFound.Length
      $response.OutputStream.Write($notFound, 0, $notFound.Length)
    }
  } catch {
    Write-Host "Request error: $_"
  } finally {
    $context.Response.OutputStream.Close()
  }
}
