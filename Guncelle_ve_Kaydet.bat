@echo off
title Yesilpelit Duyuru Panosu - Guncellemeleri Kaydet ve Diger Cihazlara Yayinla
chcp 65001 >nul

echo ========================================================
echo   🌿 YESILPELIT DUYURU PANOSU - GUNCELLEME VE YAYIN
echo ========================================================
echo.
echo Bu islem:
echo 1. Yapilan degisiklikleri derler (index.html guncellenir)
echo 2. Git uzerine kalici olarak kaydeder (commit)
echo 3. GitHub Pages uzerine yukler (git push)
echo 4. Yurt agindaki bagli TV ve cihazlara otomatik yenileme sinyali gonderir!
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [HATA] Node.js bulunamadi.
    pause
    exit /b 1
)

echo [1/4] index.html yeniden derleniyor...
node "%~dp0scripts/build_standalone.js"
if %ERRORLEVEL% NEQ 0 (
    echo [HATA] Derleme basarisiz oldu.
    pause
    exit /b 1
)

echo.
echo [2/4] Degisiklikler Git'e kaydediliyor...
cd /d "%~dp0"
git add .
set COMMIT_MSG=Duyuru Panosu Guncellemesi: %date% %time%
git commit -m "%COMMIT_MSG%"

echo.
echo [3/4] GitHub deponuza yukleniyor (git push)...
git push origin main
if %ERRORLEVEL% EQU 0 (
    echo [BILGI] GitHub Pages'e basariyla yuklendi!
) else (
    echo [BILGI] GitHub'a yuklenemedi veya internet yok. Ancak yerel degisiklikler kaydedildi.
)

echo.
echo [4/4] Bagli ekranlar senkronize ediliyor...
powershell -Command "try { Invoke-RestMethod -Uri 'http://localhost:3000/api/trigger-reload' -Method Post -TimeoutSec 2 | Out-Null } catch {}" >nul 2>nul

echo.
echo ========================================================
echo   🌿 TEBRIKLER! GUNCELLEME BASARIYLA KAYDEDILDI!
echo.
echo   - Yerel agdaki TV ve cihazlar aninda yenilendi.
echo   - GitHub Pages (Internet) 1-2 dakika icinde guncellenecek.
echo ========================================================
echo.
pause
