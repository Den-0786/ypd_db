#!/bin/bash

# Production Deployment Script for YPG Database Backend

echo "🚀 Starting YPG Database Backend Production Deployment..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install/upgrade dependencies
echo "📦 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Set production environment variables
echo "⚙️ Setting production environment variables..."
export DEBUG=False
export ALLOWED_HOSTS="your-domain.com,www.your-domain.com"
export CORS_ALLOWED_ORIGINS="https://your-domain.com,https://www.your-domain.com"

# Run database migrations
echo "🗄️ Running database migrations..."
python manage.py migrate

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

# Check deployment
echo "🔍 Running deployment checks..."
python manage.py check --deploy

# Create superuser if needed (uncomment if needed)
# echo "👤 Creating superuser..."
# python manage.py createsuperuser

echo "✅ Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update your .env file with production values"
echo "2. Start the server with: gunicorn ypg_db.wsgi:application --bind 0.0.0.0:8000"
echo "3. Set up a reverse proxy (nginx) for production"
echo "4. Configure SSL certificates"
echo ""
echo "🌐 Your API will be available at: http://your-domain.com:8000"
