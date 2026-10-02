@echo off
title Yesilpelit Duyuru Panosu - GitHub Pages Kurulumu
chcp 65001 >nul

echo ========================================================
echo   🌿 YESILPELIT DUYURU PANOSU - GITHUB PAGES YAYINI
echo ========================================================
echo.
echo Bu sihirbaz, duyuru panonuzu bilgisayariniz kapali olsa bile
echo 7/24 kalici ve ucretsiz olarak GitHub Pages uzerinden yayinlar.
echo.

:KONTROL_LOOP
echo [1/3] GitHub depo olusturma sayfasi kontrol ediliyor...
powershell -Command "$r = try { (Invoke-RestMethod -Uri 'https://api.github.com/repos/Hakan-Emlik/yesilpelit-duyuru-panosu' -ErrorAction SilentlyContinue) } catch { $null }; if ($r -and $r.name) { exit 0 } else { exit 1 }" >nul 2>nul

if %ERRORLEVEL% EQU 0 (
    echo [BILGI] 'yesilpelit-duyuru-panosu' deposu bulundu! Yuklemeye geciliyor...
    goto YUKLEME
)

echo.
echo [ADIM 1] Tarayicinizda GitHub aciliyor...
echo 1. Eger GitHub oturumunuz acik degilse once giris yapin.
echo 2. Acilan sayfada 'Repository name' kismina 'yesilpelit-duyuru-panosu' yazildigini gorun.
echo 3. Sayfanin en altindaki yesil 'Create repository' butonuna basin.
echo.

start "" "https://github.com/new?name=yesilpelit-duyuru-panosu"

echo Depoyu GitHub'da olusturduktan sonra devam etmek icin BIR TUSA BASIN...
pause >nul
echo.

powershell -Command "$r = try { (Invoke-RestMethod -Uri 'https://api.github.com/repos/Hakan-Emlik/yesilpelit-duyuru-panosu' -ErrorAction SilentlyContinue) } catch { $null }; if ($r -and $r.name) { exit 0 } else { exit 1 }" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [DIKKAT] Depo henuz olusturulmamis gorunuyor.
    echo Lutfen tarayicida yesil 'Create repository' butonuna bastiginizdan emin olun.
    echo Tekrar denemek icin bir tusa basin...
    pause >nul
    goto KONTROL_LOOP
)

:YUKLEME
echo [2/3] Dosyalar GitHub deponuza yukleniyor (git push)...
git remote remove origin 2>nul
git remote add origin https://github.com/Hakan-Emlik/yesilpelit-duyuru-panosu.git
git branch -M main
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [HATA] Yukleme sirasinda bir sorun olustu.
    echo Git kimlik dogrulama penceresi acildiysa lutfen GitHub ile giris yapin.
    pause
    exit /b 1
)

echo.
echo [3/3] GitHub Pages ayarlari aciliyor...
echo Acilan sayfada 'Build and deployment' bolumunde:
echo 1. 'Branch' acilir kutusundan 'main' secin.
echo 2. Yanindaki 'Save' butonuna basin!
echo.
start "" "https://github.com/Hakan-Emlik/yesilpelit-duyuru-panosu/settings/pages"

echo ========================================================
echo   🌿 TEBRIKLER! DUYURU PANONUZ 7/24 YAYINDA!
echo.
echo   Kalici Web Adresiniz (1-2 dakika icinde aktif olur):
echo   👉 https://hakan-emlik.github.io/yesilpelit-duyuru-panosu/
echo ========================================================
echo.
pause
