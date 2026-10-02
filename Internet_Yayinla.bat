@echo off
title Yesilpelit Duyuru Panosu - Internet Canli Yayini
chcp 65001 >nul

echo ========================================================
echo   🌿 YESILPELIT OGRENCI YURDU - GENEL INTERNET YAYINI
echo ========================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [HATA] Node.js bulunamadi. Lutfen Node.js yukleyin.
    pause
    exit /b 1
)

echo [1/2] Yerel sunucu kontrol ediliyor...
powershell -Command "$t = Test-NetConnection -ComputerName 127.0.0.1 -Port 3000 -WarningAction SilentlyContinue; if (-not $t.TcpTestSucceeded) { Start-Process -WindowStyle Hidden node -ArgumentList 'server.js' }" >nul 2>nul

echo [2/2] Cloudflare genel internet tuneli baslatiliyor...
echo.
echo --------------------------------------------------------
echo  Asagidaki linki kopyalayip telefonunuzda, tabletinizde
echo  veya yurt disindaki herhangi bir cihazda acabilirsiniz!
echo --------------------------------------------------------
echo.

cmd /c "npx -y cloudflared tunnel --url http://localhost:3000"
pause
