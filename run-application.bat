@echo off
SETLOCAL ENABLEEXTENSIONS

set "BASE_DIR=%~dp0"

echo Ensuring NuGet.org source is available...


for /f "tokens=* delims=" %%a in ('dotnet nuget list source ^| findstr /C:"https://api.nuget.org/v3/index.json"') do (
    set FOUND_NUGET=1
)

if not defined FOUND_NUGET (
    echo Adding nuget.org package source...
    dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org
)

echo Starting Backend...

pushd "%BASE_DIR%Backend"


echo Trusting the development SSL certificates...
dotnet dev-certs https --clean
dotnet dev-certs https --trust
if %ERRORLEVEL% neq 0 (
    echo Failed to trust development SSL certificates.
    popd
    pause
    exit /b 1
)


dotnet restore
if %ERRORLEVEL% neq 0 (
    echo Failed to restore backend packages.
    popd
    pause
    exit /b 1
)

dotnet clean
if %ERRORLEVEL% neq 0 (
    echo Failed to clean backend solution.
    popd
    pause
    exit /b 1
)


start "Backend Server" cmd /k "dotnet run --urls https://localhost:7059;http://localhost:5278"

popd

echo Starting Frontend...

pushd "%BASE_DIR%Frontend"

if exist node_modules (
    echo Node modules already installed.
) else (
    echo Installing frontend dependencies...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo Failed to install frontend dependencies.
        popd
        pause
        exit /b 1
    )
)


start chrome --ignore-certificate-errors --disable-web-security --user-data-dir="%TEMP%\chrome_dev"

start "Frontend Server" cmd /k "npm run dev"

popd

echo Backend and Frontend servers are starting.
pause
exit /b 0

