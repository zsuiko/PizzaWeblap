@echo off
SETLOCAL ENABLEEXTENSIONS

set "BASE_DIR=%~dp0"

echo Starting Backend...

pushd "%BASE_DIR%Backend"

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

start "Backend Server" cmd /k "dotnet run --urls http://localhost:5278;https://localhost:7059"

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

start "Frontend Server" cmd /k "npm run dev"

popd

echo Backend and Frontend servers are starting.
pause
exit /b 0
