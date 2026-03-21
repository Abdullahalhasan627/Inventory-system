# إنشاء الملف بترميز صحيح
$envContent = 'DATABASE_URL="file:./prisma/dev.db"'
[System.IO.File]::WriteAllText(
    (Join-Path $PWD ".env"),
    $envContent + "`n",
    [System.Text.UTF8Encoding]::new($false)  # $false = بدون BOM
)