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

# Render expects port 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080

# Use root to adjust mount permissions at start
USER root
COPY QuinceBackend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy published app
COPY --from=build /app/publish ./

# Run the script (which chmods /var/data and then launches the app)
ENTRYPOINT ["/entrypoint.sh"]
