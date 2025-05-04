#!/usr/bin/env python3
"""
Git işlemlerini otomatikleştiren yardımcı script
"""

import os
import sys
import subprocess

class GitHelper:
    def __init__(self):
        self.current_branch = self.get_current_branch()
        
    def run_command(self, command):
        """Git komutunu çalıştır ve çıktıyı göster"""
        print(f"🚀 Çalıştırılıyor: {command}")
        try:
            result = subprocess.run(command, shell=True, check=True, text=True, capture_output=True)
            if result.stdout:
                print(result.stdout)
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Hata: {e.stderr if e.stderr else e}")
            return False

    def get_current_branch(self):
        """Mevcut branch'i öğren"""
        try:
            result = subprocess.run(["git", "branch", "--show-current"], 
                                  capture_output=True, text=True, check=True)
            return result.stdout.strip()
        except:
            return "unknown"

    def save_current_changes(self, message="WIP: Save current changes"):
        """Mevcut değişiklikleri kaydet"""
        print("\n📝 Mevcut değişiklikler kaydediliyor...")
        self.run_command("git add .")
        self.run_command(f'git commit -m "{message}"')
        self.run_command(f"git push origin {self.current_branch}")

    def create_pr_and_merge(self):
        """PR oluştur ve merge et (GitHub'da manuel yapılmalı)"""
        print("\n📋 PR İşlemleri:")
        print("1. GitHub'ı aç: https://github.com/kafkasdeda/Xpatlat")
        print("2. 'Compare & pull request' butonuna tıkla")
        print("3. PR formunu doldur ve 'Create pull request' tıkla")
        print("4. 'Merge pull request' ve 'Confirm merge' tıkla")
        print("5. Tamamlandığında bu scripti tekrar çalıştır")
        
    def update_main_branch(self):
        """Main branch'i güncelle"""
        print("\n🔄 Main branch güncelleniyor...")
        self.run_command("git checkout main")
        self.run_command("git pull origin main")
        
    def start_new_task(self, task_id, task_description):
        """Yeni task için branch oluştur"""
        branch_name = f"feature/{task_id}-{task_description.lower().replace(' ', '-')}"
        print(f"\n🌿 Yeni branch oluşturuluyor: {branch_name}")
        
        self.run_command(f"git checkout -b {branch_name}")
        self.run_command(f'git commit --allow-empty -m "chore: start {task_id} - {task_description}"')
        self.run_command(f"git push origin {branch_name}")

def main():
    helper = GitHelper()
    
    print("🤖 Git Yardımcısı")
    print("===============")
    print(f"Mevcut branch: {helper.current_branch}")
    print("\nNe yapmak istiyorsun?")
    print("1. Mevcut değişiklikleri kaydet ve push et")
    print("2. PR oluşturma talimatlarını göster")
    print("3. Main branch'i güncelle")
    print("4. Yeni task başlat")
    print("5. Tam iş akışı (kaydet -> PR -> main güncelle -> yeni task)")
    
    choice = input("\nSeçimin (1-5): ")
    
    if choice == "1":
        commit_message = input("Commit mesajı (varsayılan: 'WIP: Save current changes'): ").strip()
        if not commit_message:
            commit_message = "WIP: Save current changes"
        helper.save_current_changes(commit_message)
        
    elif choice == "2":
        helper.create_pr_and_merge()
        
    elif choice == "3":
        helper.update_main_branch()
        
    elif choice == "4":
        task_id = input("Task ID (örn: CORE-005): ")
        task_desc = input("Task açıklaması (örn: search templates): ")
        helper.start_new_task(task_id, task_desc)
        
    elif choice == "5":
        # Tam iş akışı
        commit_message = input("Commit mesajı: ").strip()
        if not commit_message:
            commit_message = "WIP: Save current changes"
            
        helper.save_current_changes(commit_message)
        
        print("\n⏸️ Şimdi GitHub'da PR işlemlerini tamamla!")
        helper.create_pr_and_merge()
        
        input("\n✅ PR işlemleri tamamlandıysa Enter'a bas...")
        
        helper.update_main_branch()
        
        new_task = input("\nYeni task başlatmak ister misin? (e/h): ")
        if new_task.lower() == 'e':
            task_id = input("Task ID (örn: CORE-005): ")
            task_desc = input("Task açıklaması (örn: search templates): ")
            helper.start_new_task(task_id, task_desc)
    
    print("\n✨ İşlem tamamlandı!")

if __name__ == "__main__":
    main()
