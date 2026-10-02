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
echo [1/3] GitHub yeni depo olusturma sayfasi aciliyor...
start "" "https://github.com/new?name=yesilpelit-duyuru-panosu"

echo.
echo Lutfen acilan tarayicida alttaki yeşil 'Create repository' butonuna basin.
echo Depoyu olusturduktan sonra devam etmek icin bir tusa basin...
pause >nul

echo.
echo [2/3] Kodlar GitHub deponuza yukleniyor...
git remote remove origin 2>nul
git remote add origin https://github.com/Hakan-Emlik/yesilpelit-duyuru-panosu.git
git branch -M main
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [UYARI] Push islemi tamamlanamadi. Lutfen GitHub oturumunuzun acik oldugundan emin olun.
    pause
    exit /b 1
)

echo.
echo [3/3] GitHub Pages ayarlari aciliyor...
echo Acilan sayfada 'Build and deployment' altinda:
echo Branch: 'main' secin ve 'Save' butonuna tiklayin!
start "" "https://github.com/Hakan-Emlik/yesilpelit-duyuru-panosu/settings/pages"

echo.
echo ========================================================
echo   🌿 TEBRIKLER! DUYURU PANONUZ 7/24 INTERNETTE YAYINDA!
echo.
echo   Kalici Web Adresiniz:
echo   👉 https://hakan-emlik.github.io/yesilpelit-duyuru-panosu/
echo ========================================================
echo.
pause
