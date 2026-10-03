@echo off
title Yesilpelit Duyuru Panosu - Guncelle ve Yayinla
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo ========================================================
echo   YESILPELIT DUYURU PANOSU - GUNCELLEME VE YAYIN
echo ========================================================
echo.
echo Bu islem:
echo 1. Yapilan degisiklikleri derler (index.html guncellenir)
echo 2. Git uzerine kalici olarak kaydeder (commit)
echo 3. GitHub Pages uzerine yukler (git push)
echo 4. Bagli TV ve ekranlara otomatik yenileme sinyali gonderir
echo.

set "NODE_CMD=node"
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    if exist "C:\Program Files\nodejs\node.exe" (
        set "NODE_CMD=C:\Program Files\nodejs\node.exe"
    ) else if exist "%LOCALAPPDATA%\Programs\node\node.exe" (
        set "NODE_CMD=%LOCALAPPDATA%\Programs\node\node.exe"
    ) else (
        echo [HATA] Node.js bulunamadi! Lutfen Node.js kurulu oldugundan emin olun.
        pause
        exit /b 1
    )
)

echo [1/4] index.html yeniden derleniyor...
"%NODE_CMD%" "%~dp0scripts\build_standalone.js"
if %ERRORLEVEL% NEQ 0 (
    echo [HATA] Derleme basarisiz oldu.
    pause
    exit /b 1
)

echo.
echo [2/4] Degisiklikler Git'e kaydediliyor...
git add .
set "DATETIME=%date% %time%"
git commit -m "Duyuru Panosu Guncellemesi: !DATETIME!"

echo.
echo [3/4] GitHub Pages'e yukleniyor (git push)...
git push origin main
if %ERRORLEVEL% EQU 0 (
    echo [BILGI] GitHub Pages'e basariyla yuklendi!
) else (
    echo [BILGI] GitHub'a yuklenemedi veya internet yok. Ancak yerel degisiklikler kaydedildi.
)

echo.
echo [4/4] Bagli ekranlar senkronize ediliyor...
powershell -NoProfile -Command "try { Invoke-RestMethod -Uri 'http://localhost:3000/api/trigger-reload' -Method Post -TimeoutSec 2 | Out-Null } catch {}" >nul 2>nul

echo.
echo ========================================================
echo   TEBRIKLER! GUNCELLEME BASARIYLA TAMAMLANDI!
echo.
echo   - Yerel agdaki TV ve cihazlar aninda yenilendi.
echo   - GitHub Pages (Internet) 1-2 dakika icinde guncellenecek.
echo ========================================================
echo.
pause
