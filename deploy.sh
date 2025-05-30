#!/bin/bash

# 🚀 سكريبت نشر متقدم لمشروع بورتفوليو Node.js
set -e

# ألوان للرسائل
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_step() { echo -e "${PURPLE}🔄 $1${NC}"; }

echo -e "${CYAN}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    🚀 نشر بورتفوليو Node.js                  ║"
echo "║                   Hassan Portfolio Deploy                     ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# التحقق من Git
if ! command -v git &> /dev/null; then
    print_error "Git غير مثبت"
    exit 1
fi

# إضافة جميع الملفات
print_step "إضافة الملفات..."
git add .

# التحقق من وجود تغييرات
if git diff --staged --quiet; then
    print_warning "لا توجد تغييرات للإضافة"
else
    print_info "تم العثور على تغييرات جديدة"
    
    # طلب رسالة commit
    echo -n "أدخل رسالة الـ commit (اتركها فارغة للرسالة التلقائية): "
    read commit_message
    
    if [ -z "$commit_message" ]; then
        commit_message="🔄 تحديث موقع البورتفوليو - $(date '+%Y-%m-%d %H:%M')"
    fi
    
    print_step "إنشاء commit..."
    if git commit -S -m "$commit_message"; then
        print_success "تم إنشاء commit بنجاح"
    elif git commit -m "$commit_message"; then
        print_warning "تم إنشاء commit بدون توقيع GPG"
    else
        print_error "فشل في إنشاء commit"
        exit 1
    fi
fi

# التحقق من وجود remote
if ! git remote get-url origin > /dev/null 2>&1; then
    print_warning "لم يتم العثور على GitHub remote"
    echo -n "أدخل رابط GitHub repository: "
    read repo_url
    git remote add origin "$repo_url"
    print_success "تم إضافة GitHub remote"
fi

# رفع إلى GitHub
print_step "رفع التغييرات إلى GitHub..."
if git push -u origin main; then
    print_success "تم النشر بنجاح على GitHub!"
    print_info "🌐 الموقع متوفر على: https://hassan.github.io/nodejs-portfolio"
else
    print_error "فشل في رفع التغييرات"
    exit 1
fi

print_success "✨ تم النشر بنجاح! الموقع جاهز للعرض"
