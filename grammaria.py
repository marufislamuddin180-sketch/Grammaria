import random
import sys
import time

def slow_print(text, delay=0.02):
    """Mencetak teks secara bertahap seperti game RPG retro."""
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    print()

# ==========================================================
# DATABASE PERTANYAAN GRAMMAR BERDASARKAN LEVEL
# ==========================================================
GRAMMAR_DB = {
    1: [
        {
            "monster_text": "Yesterday, the Goblin say that he want all our gold!",
            "question": "Pilih perbaikan kalimat yang benar (Simple Past Tense):",
            "options": [
                "Yesterday, the Goblin said that he wanted all our gold.",
                "Yesterday, the Goblin says that he wants all our gold.",
                "Yesterday, the Goblin had said that he wanting all our gold."
            ],
            "correct": 0,
            "explanation": "Keterangan waktu 'Yesterday' membutuhkan Simple Past Tense ('said' dan 'wanted'), bukan verb 1 ('say', 'want')."
        },
        {
            "monster_text": "Look! The dragon is fly over the burning village!",
            "question": "Pilih perbaikan kalimat yang benar (Present Continuous):",
            "options": [
                "Look! The dragon flies over the burning village!",
                "Look! The dragon is flying over the burning village!",
                "Look! The dragon is flied over the burning village!"
            ],
            "correct": 1,
            "explanation": "Kata seru 'Look!' menandakan aksi sedang berlangsung. Rumus Present Continuous: S + to be (is/am/are) + V-ing ('is flying')."
        },
        {
            "monster_text": "She do not knows the secret incantation to break the curse.",
            "question": "Pilih perbaikan Subject-Verb / Auxiliary yang benar:",
            "options": [
                "She does not knows the secret incantation.",
                "She does not know the secret incantation.",
                "She do not know the secret incantation."
            ],
            "correct": 1,
            "explanation": "Untuk subjek tunggal orang ketiga ('She'), gunakan auxiliary 'does not' diikuti oleh Bare Infinitive/Verb 1 murni ('know', bukan 'knows')."
        }
    ],
    2: [
        {
            "monster_text": "The army of dark wraiths are marching towards the castle gates.",
            "question": "Perbaiki kesalahan Subject-Verb Agreement:",
            "options": [
                "The army of dark wraiths were marching towards the castle gates.",
                "The army of dark wraiths is marching towards the castle gates.",
                "The armies of dark wraith is marching towards the castle gates."
            ],
            "correct": 1,
            "explanation": "Subjek utama kalimat adalah 'The army' (singular collective noun), bukan 'dark wraiths'. Maka to be yang tepat adalah 'is', bukan 'are'."
        },
        {
            "monster_text": "The potion was bitter, he drank it anyway to survive.",
            "question": "Perbaiki kesalahan Comma Splice (dua kalimat independen yang dipisah koma):",
            "options": [
                "The potion was bitter; he drank it anyway to survive.",
                "The potion was bitter he drank it anyway to survive.",
                "The potion was bitter, but drank it anyway to survive."
            ],
            "correct": 0,
            "explanation": "Comma splice terjadi ketika dua klausa independen hanya dihubungkan koma. Gunakan Semicolon (;) atau tambahkan konjungsi koordinatif (, but he drank...)."
        },
        {
            "monster_text": "Between you and I, this dungeon hides a terrifying beast.",
            "question": "Perbaiki kesalahan penggunaan Pronoun Case:",
            "options": [
                "Between you and me, this dungeon hides a terrifying beast.",
                "Between you and myself, this dungeon hides a terrifying beast.",
                "Between he and I, this dungeon hides a terrifying beast."
            ],
            "correct": 0,
            "explanation": "Kata 'between' adalah preposisi (preposition). Kata ganti setelah preposisi harus berupa Object Pronoun ('me', bukan 'I')."
        }
    ],
    3: [
        {
            "monster_text": "If the wizard studied harder, he would have defeated the dragon yesterday.",
            "question": "Perbaiki kesalahan Mixed/Third Conditional:",
            "options": [
                "If the wizard had studied harder, he would defeat the dragon yesterday.",
                "If the wizard had studied harder, he would have defeated the dragon yesterday.",
                "If the wizard has studied harder, he would have defeated the dragon yesterday."
            ],
            "correct": 1,
            "explanation": "Peristiwa masa lalu yang tidak terjadi ('yesterday') menggunakan Third Conditional: If + Past Perfect (had studied), S + would have + V3 (would have defeated)."
        },
        {
            "monster_text": "The ancient spell was spoke by the elder runesmith.",
            "question": "Perbaiki bentuk Passive Voice:",
            "options": [
                "The ancient spell was spoken by the elder runesmith.",
                "The ancient spell was speaked by the elder runesmith.",
                "The ancient spell were spoken by the elder runesmith."
            ],
            "correct": 0,
            "explanation": "Rumus Passive Voice adalah To Be + Past Participle (V3). Bentuk V3 dari 'speak' adalah 'spoken' (speak - spoke - spoken)."
        }
    ]
}

# ==========================================================
# CLASS PLAYER & MONSTER
# ==========================================================
class Player:
    def __init__(self, name, char_class):
        self.name = name
        self.char_class = char_class
        self.hp = 100
        self.max_hp = 100
        self.level = 1
        self.exp = 0
        self.exp_needed = 50
        self.potions = 2

        # Bonus Pasif berdasarkan Class
        if char_class == "Syntax Knight":
            self.max_hp = 120
            self.hp = 120
            self.damage_mod = 30
        elif self.char_class == "Vocab Mage":
            self.damage_mod = 40  # Damage lebih tinggi
        elif self.char_class == "Punctuation Rogue":
            self.damage_mod = 35
            self.potions = 3

    def get_attack_narration(self):
        if self.char_class == "Syntax Knight":
            return "menghunuskan 'Blade of Proper Agreement' dan menebas struktur kacau lawan!"
        elif self.char_class == "Vocab Mage":
            return "merapal mantra 'Lexical Surge', menyemburkan ledakan sinonim tingkat tinggi!"
        else:
            return "melemparkan 'Semicolon Dagger', membelah run-on sentence monster dengan presisi mematikan!"

    def display_status(self):
        print(f"\n" + "="*50)
        print(f"[{self.name} | Class: {self.char_class}]")
        print(f"[HP: {self.hp}/{self.max_hp} | Level: {self.level} | EXP: {self.exp}/{self.exp_needed} | Potions: {self.potions}]")
        print("="*50 + "\n")

    def gain_exp(self, amount):
        self.exp += amount
        slow_print(f"✨ Kamu memperoleh {amount} EXP!")
        if self.exp >= self.exp_needed:
            self.level_up()

    def level_up(self):
        self.level += 1
        self.exp -= self.exp_needed
        self.exp_needed += 50
        self.max_hp += 20
        self.hp = self.max_hp
        slow_print("\n🎉 LEVEL UP! 🎉")
        slow_print(f"Kamu sekarang mencapai Level {self.level}!")
        slow_print(f"Darah dipulihkan penuh! Max HP bertambah menjadi {self.max_hp}.")
        slow_print("Tingkat kesulitan grammar lawan kini semakin menantang!\n")

    def use_potion(self):
        if self.potions > 0:
            heal_amount = 40
            self.hp = min(self.max_hp, self.hp + heal_amount)
            self.potions -= 1
            slow_print(f"\n🧪 Kamu meminum Elixir of Eloquence. HP pulih sebesar {heal_amount} poin! (HP: {self.hp}/{self.max_hp})")
            return True
        else:
            slow_print("\n❌ Kamu tidak memiliki potion tersisa!")
            return False


class Monster:
    def __init__(self, name, hp, damage, tier):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.damage = damage
        self.tier = tier

# ==========================================================
# SISTEM PERTARUNGAN (COMBAT ENGINE)
# ==========================================================
def battle(player, monster):
    slow_print(f"\n⚠️  MONSTER MUNCUL! Seekor {monster.name} menghadang jalanmu!")
    slow_print(f"Monster HP: {monster.hp} | Kekuatan Serangan: {monster.damage}")

    while monster.hp > 0 and player.hp > 0:
        player.display_status()
        print(f"HP Monster: [{monster.name}: {monster.hp}/{monster.max_hp}]")
        print("\nTindakan:")
        print("1. Hadapi Serangan Monster (Jawab Tantangan Grammar)")
        print("2. Gunakan Potion")
        
        action = input("Pilih tindakan (1/2): ").strip()
        if action == "2":
            player.use_potion()
            continue
        elif action != "1":
            print("Pilihan tidak valid, kamu bersiap menghadapi monster!")

        # Ambil soal sesuai tier monster / level pemain
        level_pool = GRAMMAR_DB.get(monster.tier, GRAMMAR_DB[1])
        challenge = random.choice(level_pool)

        slow_print(f"\n👹 {monster.name} menyerang dengan distorsi bahasa:")
        print(f"   \"{challenge['monster_text']}\"")
        slow_print(f"\n📜 Tantangan: {challenge['question']}")

        options = challenge["options"]
        for idx, opt in enumerate(options):
            print(f"   [{chr(65 + idx)}] {opt}")

        choice = input("\nJawabanmu (A/B/C): ").strip().upper()
        correct_letter = chr(65 + challenge["correct"])

        if choice == correct_letter:
            damage_dealt = player.damage_mod + random.randint(5, 15)
            monster.hp -= damage_dealt
            slow_print(f"\n✅ BENAR! {player.name} {player.get_attack_narration()}")
            slow_print(f"💥 {monster.name} terkena {damage_dealt} damage!")
        else:
            damage_taken = monster.damage
            player.hp -= damage_taken
            slow_print(f"\n❌ SALAH! Jawaban yang benar adalah [{correct_letter}].")
            slow_print(f"💡 Penjelasan Edukasi: {challenge['explanation']}")
            slow_print(f"⚡ Gelombang kesalahan grammar menghantammu! Kamu terkena {damage_taken} damage.")

        time.sleep(1)

    if player.hp <= 0:
        slow_print(f"\n💀 {player.name} telah dikalahkan oleh kekacauan sintaksis...")
        slow_print("GAME OVER. Pelajari kembali aturan tata bahasamu dan coba lagi!")
        sys.exit()
    else:
        slow_print(f"\n🏆 VICTORY! Kamu berhasil menyucikan {monster.name}!")
        player.gain_exp(35)
        # Drop Potion Chance
        if random.random() < 0.5:
            player.potions += 1
            slow_print("🎁 Monster menjatuhkan 1x Potion!")


# ==========================================================
# MAIN GAME LOOP & STORYLINE
# ==========================================================
def main():
    print("=" * 60)
    print("      GRAMMARIA: THE QUEST FOR PERFECT SYNTAX")
    print("=" * 60)
    slow_print("\nDunia Grammaria di ambang kehancuran...")
    slow_print("Kutukan Syntax Error mengubah makna kalimat menjadi monster liar!")

    name = input("\nMasukkan Nama Pahlawanmu: ").strip()
    if not name:
        name = "Hero"

    print("\nPilih Class:")
    print("1. Syntax Knight (HP tebal, stabil, menguasai tatanan kata)")
    print("2. Vocab Mage (Damage tinggi, ahli diksi mematikan)")
    print("3. Punctuation Rogue (Membawa ekstra potion, lincah membelah kalimat)")
    
    class_choice = input("Pilihanmu (1/2/3): ").strip()
    if class_choice == "2":
        selected_class = "Vocab Mage"
    elif class_choice == "3":
        selected_class = "Punctuation Rogue"
    else:
        selected_class = "Syntax Knight"

    player = Player(name, selected_class)
    slow_print(f"\nSelamat datang, {player.name} sang {player.char_class}!")

    # Daftar Dungeon / Encounter
    encounters = [
        {"name": "Typo Goblin", "hp": 40, "damage": 15, "tier": 1},
        {"name": "Tense-Twisting Troll", "hp": 65, "damage": 20, "tier": 1},
        {"name": "Comma Splice Dragon", "hp": 90, "damage": 25, "tier": 2},
        {"name": "Dangling Modifier Chimera", "hp": 110, "damage": 30, "tier": 2},
        {"name": "The Great Chaos Overlord (Passive Voice Demon)", "hp": 150, "damage": 35, "tier": 3}
    ]

    for index, enc_data in enumerate(encounters):
        slow_print(f"\n--- Memasuki Wilayah {index + 1} ---")
        monster = Monster(
            name=enc_data["name"],
            hp=enc_data["hp"],
            damage=enc_data["damage"],
            tier=enc_data["tier"]
        )
        battle(player, monster)

    slow_print("\n" + "=" * 60)
    slow_print(f"🎉 SELAMAT {player.name.upper()}! KAMU MENYELAMATKAN GRAMMARIA! 🎉")
    slow_print("Hukum tata bahasa telah dipulihkan di seluruh penjuru negeri.")
    slow_print("Setiap kalimat kini berdiri tegak dengan makna yang sempurna!")
    print("=" * 60)

if __name__ == "__main__":
    main()