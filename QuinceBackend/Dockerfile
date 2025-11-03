# --- Build stage ---
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# copy csproj first (faster restore)
COPY QuinceBackend/*.csproj ./QuinceBackend/
RUN dotnet restore QuinceBackend/QuinceBackend.csproj

# copy everything and build
COPY . .
RUN dotnet publish QuinceBackend/QuinceBackend.csproj -c Release -o /app/publish

# --- Runtime stage ---
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
# Render expects apps to listen on 0.0.0.0:8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080

# copy published app
COPY --from=build /app/publish ./

# run the app
ENTRYPOINT ["dotnet", "QuinceBackend.dll"]
