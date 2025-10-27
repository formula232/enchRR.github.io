<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Зачарования - Rush Royale</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --common: #b0b0b0;
            --rare: #4ecdc4;
            --epic: #8a2be2;
            --legendary: #ffd700;
        }

        body {
            background: linear-gradient(135deg, #0c0c1e 0%, #1a1a3e 50%, #2d2d5a 100%);
            color: #fff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            background-attachment: fixed;
        }

        .magic-orb {
            position: fixed;
            top: 15%;
            left: 5%;
            width: 80px;
            height: 80px;
            background: radial-gradient(circle at 30% 30%, var(--epic), transparent);
            border-radius: 50%;
            animation: pulse 4s ease-in-out infinite;
            box-shadow: 0 0 40px var(--epic);
            z-index: -1;
            opacity: 0.7;
        }

        .magic-rune {
            position: fixed;
            bottom: 10%;
            right: 8%;
            width: 120px;
            height: 120px;
            background: conic-gradient(from 0deg, var(--legendary), var(--epic), var(--rare), var(--common), var(--legendary));
            border-radius: 50%;
            animation: rotate 20s linear infinite;
            opacity: 0.1;
            z-index: -1;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.2); opacity: 0.9; }
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .header {
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(15px);
            padding: 2.5rem 0;
            text-align: center;
            border-bottom: 3px solid var(--epic);
            position: relative;
            overflow: hidden;
        }

        .title {
            font-size: 3.2rem;
            background: linear-gradient(45deg, var(--common), var(--rare), var(--epic), var(--legendary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(138, 43, 226, 0.3);
            margin-bottom: 0.5rem;
            font-weight: 800;
            letter-spacing: 2px;
        }

        .subtitle {
            font-size: 1.3rem;
            color: #c0c0ff;
            opacity: 0.8;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }

        .rarity-section {
            margin-bottom: 3rem;
        }

        .section-title {
            font-size: 2.2rem;
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid;
            display: inline-block;
        }

        .common-title { color: var(--common); border-color: var(--common); }
        .rare-title { color: var(--rare); border-color: var(--rare); }
        .epic-title { color: var(--epic); border-color: var(--epic); }
        .legendary-title { color: var(--legendary); border-color: var(--legendary); }

        .enchantments-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .enchantment-card {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(12px);
            border: 2px solid;
            border-radius: 12px;
            padding: 1.5rem;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }

        .enchantment-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: left 0.6s;
        }

        .enchantment-card:hover::before {
            left: 100%;
        }

        .enchantment-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
        }

        .enchantment-card.common { border-color: var(--common); }
        .enchantment-card.rare { border-color: var(--rare); }
        .enchantment-card.epic { border-color: var(--epic); }
        .enchantment-card.legendary { border-color: var(--legendary); }

        .enchantment-card.common:hover { box-shadow: 0 12px 25px rgba(176, 176, 176, 0.2); }
        .enchantment-card.rare:hover { box-shadow: 0 12px 30px rgba(78, 205, 196, 0.3); }
        .enchantment-card.epic:hover { box-shadow: 0 12px 35px rgba(138, 43, 226, 0.4); }
        .enchantment-card.legendary:hover { box-shadow: 0 12px 40px rgba(255, 215, 0, 0.3); }

        .enchantment-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
        }

        .enchantment-name {
            font-size: 1.4rem;
            font-weight: 600;
            margin: 0;
        }

        .enchantment-level {
            background: rgba(255, 255, 255, 0.15);
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .enchantment-type {
            display: inline-block;
            background: rgba(255, 255, 255, 0.1);
            padding: 0.4rem 1rem;
            border-radius: 15px;
            font-size: 0.9rem;
            margin-bottom: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .enchantment-description {
            color: #d0d0ff;
            line-height: 1.5;
            font-size: 0.95rem;
            margin-bottom: 1rem;
        }

        .enchantment-stats {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            margin-top: 1rem;
        }

        .stat {
            background: rgba(0, 0, 0, 0.4);
            padding: 0.5rem 0.9rem;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 0.85rem;
        }

        .stat-value {
            font-weight: 700;
            margin-right: 0.3rem;
        }

        .common .stat-value { color: var(--common); }
        .rare .stat-value { color: var(--rare); }
        .epic .stat-value { color: var(--epic); }
        .legendary .stat-value { color: var(--legendary); }

        .enchantment-icon {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            opacity: 0.7;
        }

        .common .enchantment-icon { background: rgba(176, 176, 176, 0.2); }
        .rare .enchantment-icon { background: rgba(78, 205, 196, 0.2); }
        .epic .enchantment-icon { background: rgba(138, 43, 226, 0.2); }
        .legendary .enchantment-icon { background: rgba(255, 215, 0, 0.2); }

        .filters {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin: 2rem 0;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }

        .filter-btn {
            background: rgba(138, 43, 226, 0.15);
            border: 1px solid var(--epic);
            color: #b19cd9;
            padding: 0.8rem 1.8rem;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
        }

        .filter-btn:hover, .filter-btn.active {
            background: var(--epic);
            color: white;
            box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
        }

        .search-box {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(138, 43, 226, 0.4);
            border-radius: 25px;
            padding: 1rem 1.8rem;
            color: white;
            font-size: 1rem;
            width: 100%;
            max-width: 500px;
            margin: 2rem auto;
            display: block;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }

        .search-box:focus {
            outline: none;
            border-color: var(--epic);
            box-shadow: 0 0 25px rgba(138, 43, 226, 0.4);
            background: rgba(255, 255, 255, 0.12);
        }

        .coop-badge {
            display: inline-block;
            background: rgba(78, 205, 196, 0.3);
            color: var(--rare);
            padding: 0.2rem 0.6rem;
            border-radius: 10px;
            font-size: 0.75rem;
            margin-left: 0.5rem;
            border: 1px solid var(--rare);
        }

        .cooldown {
            display: inline-block;
            background: rgba(255, 100, 100, 0.3);
            color: #ff6b6b;
            padding: 0.2rem 0.6rem;
            border-radius: 10px;
            font-size: 0.75rem;
            margin-left: 0.5rem;
            border: 1px solid #ff6b6b;
        }

        @media (max-width: 768px) {
            .title { font-size: 2.3rem; }
            .section-title { font-size: 1.8rem; }
            .enchantments-grid { grid-template-columns: 1fr; }
            .container { padding: 1rem; }
            .magic-orb, .magic-rune { display: none; }
        }

        .rarity-badge {
            position: absolute;
            top: -1px;
            left: -1px;
            padding: 0.4rem 1rem;
            border-radius: 8px 0 12px 0;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .common .rarity-badge { background: var(--common); color: #333; }
        .rare .rarity-badge { background: var(--rare); color: #000; }
        .epic .rarity-badge { background: var(--epic); color: #fff; }
        .legendary .rarity-badge { background: var(--legendary); color: #000; }
    </style>
</head>
<body>
    <div class="magic-orb"></div>
    <div class="magic-rune"></div>
    
    <header class="header">
        <h1 class="title">Зачарования Rush Royale</h1>
        <p class="subtitle">Усиль свою колоду магической силой</p>
    </header>

    <div class="container">
        <input type="text" class="search-box" placeholder="Поиск зачарований...">
        
        <div class="filters">
            <button class="filter-btn active">Все</button>
            <button class="filter-btn">Обычные</button>
            <button class="filter-btn">Редкие</button>
            <button class="filter-btn">Эпические</button>
            <button class="filter-btn">Легендарные</button>
            <button class="filter-btn">Атакующие</button>
            <button class="filter-btn">Поддерживающие</button>
        </div>

        <!-- Обычные зачарования -->
        <div class="rarity-section">
            <h2 class="section-title common-title">Обычные</h2>
            <div class="enchantments-grid">
                <div class="enchantment-card common">
                    <div class="rarity-badge">Обычное</div>
                    <div class="enchantment-icon">🔄</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Отмщение</h3>
                    </div>
                    <span class="enchantment-type">Бафф</span>
                    <p class="enchantment-description">После понижения ранга слияния пешки фракции урон другой пешки этой же фракции увеличивается на 10% в течение 5с.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">+10%</span>урон</div>
                        <div class="stat"><span class="stat-value">5с</span>длительность</div>
                    </div>
                </div>

                <div class="enchantment-card common">
                    <div class="rarity-badge">Обычное</div>
                    <div class="enchantment-icon">📐</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Пограничники</h3>
                    </div>
                    <span class="enchantment-type">Позиционное</span>
                    <p class="enchantment-description">На угловых клетках поля урон пешек фракции повышен на 1%.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">+1%</span>урон</div>
                        <div class="stat"><span class="stat-value">4</span>клетки</div>
                    </div>
                </div>

                <div class="enchantment-card common">
                    <div class="rarity-badge">Обычное</div>
                    <div class="enchantment-icon">⚡</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Порыв</h3>
                    </div>
                    <span class="enchantment-type">Поддерживающее</span>
                    <p class="enchantment-description">При слиянии пешек фракции увеличивает скорость атаки 2 случайных пешек на 5% в течение 10с.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">+5%</span>скорость</div>
                        <div class="stat"><span class="stat-value">10с</span>длительность</div>
                    </div>
                </div>

                <div class="enchantment-card common">
                    <div class="rarity-badge">Обычное</div>
                    <div class="enchantment-icon">😠</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Гнев</h3>
                    </div>
                    <span class="enchantment-type">Атакующее</span>
                    <p class="enchantment-description">После появления пешки этой фракции на поле увеличивает её урон на 10% в течение 20 сек.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">+10%</span>урон</div>
                        <div class="stat"><span class="stat-value">20с</span>длительность</div>
                    </div>
                </div>

                <div class="enchantment-card common">
                    <div class="rarity-badge">Обычное</div>
                    <div class="enchantment-icon">💨</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Подкидыш</h3>
                    </div>
                    <span class="enchantment-type">Тактическое</span>
                    <p class="enchantment-description">С шансом 8% убийство мини-босса пешкой этой фракции призывает ослабленного мини-босса Вихрь на сторону противника.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">8%</span>шанс</div>
                        <div class="stat"><span class="stat-value">Вихрь</span>мини-босс</div>
                    </div>
                </div>

                <div class="enchantment-card common">
                    <div class="rarity-badge">Обычное</div>
                    <div class="enchantment-icon">💀</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Карманное изнурение</h3>
                    </div>
                    <span class="enchantment-type">Контроль</span>
                    <p class="enchantment-description">Убийство босса пешкой этой фракции в конце раунда создаёт снаряд, который летит в клетку поля и снижает скорость атаки пешки на 40% в течение 15с. <span class="coop-badge">Co-Op: ускоряет</span></p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">-40%</span>скорость</div>
                        <div class="stat"><span class="stat-value">15с</span>длительность</div>
                    </div>
                </div>

                <div class="enchantment-card common">
                    <div class="rarity-badge">Обычное</div>
                    <div class="enchantment-icon">🎯</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Боевой азарт</h3>
                    </div>
                    <span class="enchantment-type">Бафф</span>
                    <p class="enchantment-description">С шансом 1% увеличивает крит, урон пешек этой фракции на 3% в течение 10 сек. после убийства монстра.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">1%</span>шанс</div>
                        <div class="stat"><span class="stat-value">+3%</span>урон и крит</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Редкие зачарования -->
        <div class="rarity-section">
            <h2 class="section-title rare-title">Редкие</h2>
            <div class="enchantments-grid">
                <div class="enchantment-card rare">
                    <div class="rarity-badge">Редкое</div>
                    <div class="enchantment-icon">🐉</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Охота на дракона</h3>
                    </div>
                    <span class="enchantment-type">Экономическое</span>
                    <p class="enchantment-description">Убийство босса или мини-босса пешкой этой фракции увеличивает получаемую с него ману на 25%.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">+25%</span>маны</div>
                        <div class="stat"><span class="stat-value">боссы</span>цель</div>
                    </div>
                </div>

                <div class="enchantment-card rare">
                    <div class="rarity-badge">Редкое</div>
                    <div class="enchantment-icon">💨</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Подкидыш II</h3>
                        <span class="enchantment-level">Уровень 2</span>
                    </div>
                    <span class="enchantment-type">Тактическое</span>
                    <p class="enchantment-description">С шансом 15% убийство мини-босса пешкой этой фракции призывает ослабленного мини-босса Знаменосец на сторону противника.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">15%</span>шанс</div>
                        <div class="stat"><span class="stat-value">Знаменосец</span>мини-босс</div>
                    </div>
                </div>

                <div class="enchantment-card rare">
                    <div class="rarity-badge">Редкое</div>
                    <div class="enchantment-icon">👹</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Зачарованный монстр</h3>
                    </div>
                    <span class="enchantment-type">Призыв</span>
                    <p class="enchantment-description">Убийство монстра пешкой этой фракции с шансом 4% призывает зачарованного монстра на сторону противника. Зачарованного монстра нельзя замедлить.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">4%</span>шанс</div>
                        <div class="stat"><span class="stat-value">незамедлим</span>свойство</div>
                    </div>
                </div>

                <div class="enchantment-card rare">
                    <div class="rarity-badge">Редкое</div>
                    <div class="enchantment-icon">😠</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Гнев II</h3>
                        <span class="enchantment-level">Уровень 2</span>
                    </div>
                    <span class="enchantment-type">Атакующее</span>
                    <p class="enchantment-description">После появления пешки этой фракции на поле увеличивает её урон на 15% в течение 20 сек.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">+15%</span>урон</div>
                        <div class="stat"><span class="stat-value">20с</span>длительность</div>
                    </div>
                </div>

                <div class="enchantment-card rare">
                    <div class="rarity-badge">Редкое</div>
                    <div class="enchantment-icon">📈</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Изобилие</h3>
                    </div>
                    <span class="enchantment-type">Бафф</span>
                    <p class="enchantment-description">Пешки этой фракции, имеющие ранг слияния 5 и выше, увеличивают свой урон на 2% за каждый ранг слияния (максимум – 6% на 7 ранге слияния).</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">+2%</span>за ранг</div>
                        <div class="stat"><span class="stat-value">+6%</span>максимум</div>
                    </div>
                </div>

                <div class="enchantment-card rare">
                    <div class="rarity-badge">Редкое</div>
                    <div class="enchantment-icon">📐</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Пограничники II</h3>
                        <span class="enchantment-level">Уровень 2</span>
                    </div>
                    <span class="enchantment-type">Позиционное</span>
                    <p class="enchantment-description">На угловых клетках поля урон пешек фракции повышен на 2%.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">+2%</span>урон</div>
                        <div class="stat"><span class="stat-value">4</span>клетки</div>
                    </div>
                </div>

                <div class="enchantment-card rare">
                    <div class="rarity-badge">Редкое</div>
                    <div class="enchantment-icon">💀</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Карманное изнурение II</h3>
                        <span class="enchantment-level">Уровень 2</span>
                    </div>
                    <span class="enchantment-type">Контроль</span>
                    <p class="enchantment-description">Убийство босса пешкой этой фракции создает в конце волны снаряд, который снижает на 30% скорость атаки пешек противника, находящихся в одном столбце. <span class="coop-badge">Co-Op: ускоряет</span></p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">-30%</span>скорость</div>
                        <div class="stat"><span class="stat-value">1 столбец</span>зона</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Эпические зачарования -->
        <div class="rarity-section">
            <h2 class="section-title epic-title">Эпические</h2>
            <div class="enchantments-grid">
                <div class="enchantment-card epic">
                    <div class="rarity-badge">Эпическое</div>
                    <div class="enchantment-icon">👹</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Зачарованный монстр II</h3>
                        <span class="enchantment-level">Уровень 2</span>
                    </div>
                    <span class="enchantment-type">Призыв</span>
                    <p class="enchantment-description">Убийство монстра пешкой этой фракции с шансом 6% призывает зачарованного монстра на сторону противника. Зачарованного монстра нельзя замедлить.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">6%</span>шанс</div>
                        <div class="stat"><span class="stat-value">незамедлим</span>свойство</div>
                    </div>
                </div>

                <div class="enchantment-card epic">
                    <div class="rarity-badge">Эпическое</div>
                    <div class="enchantment-icon">🎯</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Боевой азарт II</h3>
                        <span class="enchantment-level">Уровень 2</span>
                    </div>
                    <span class="enchantment-type">Бафф</span>
                    <p class="enchantment-description">С шансом 1.5% увеличивает крит, урон пешек этой фракции на 10% в течение 10 сек. после убийства монстра.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">1.5%</span>шанс</div>
                        <div class="stat"><span class="stat-value">+10%</span>урон и крит</div>
                    </div>
                </div>

                <div class="enchantment-card epic">
                    <div class="rarity-badge">Эпическое</div>
                    <div class="enchantment-icon">🛡️</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Контрзаклятье</h3>
                    </div>
                    <span class="enchantment-type">Защитное</span>
                    <p class="enchantment-description">С шансом 10% убийство босса или мини-босса пешкой фракции снимет негативные эффекты с 1 пешки и оглушит 1 пешку противника на 4 сек. <span class="coop-badge">Co-Op: без оглушения</span></p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">10%</span>шанс</div>
                        <div class="stat"><span class="stat-value">4с</span>оглушение</div>
                    </div>
                </div>

                <div class="enchantment-card epic">
                    <div class="rarity-badge">Эпическое</div>
                    <div class="enchantment-icon">🌑</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Серая мораль</h3>
                    </div>
                    <span class="enchantment-type">Тактическое</span>
                    <p class="enchantment-description">При использовании способности героя другим игроком урон ваших пешек этой фракции увеличивается на 20% в течение 5с.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">+20%</span>урон</div>
                        <div class="stat"><span class="stat-value">5с</span>длительность</div>
                    </div>
                </div>

                <div class="enchantment-card epic">
                    <div class="rarity-badge">Эпическое</div>
                    <div class="enchantment-icon">💨</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Подкидыш III</h3>
                        <span class="enchantment-level">Уровень 3</span>
                    </div>
                    <span class="enchantment-type">Тактическое</span>
                    <p class="enchantment-description">Улучшенная версия подкидыша с увеличенным шансом срабатывания.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">20%+</span>шанс</div>
                        <div class="stat"><span class="stat-value">2+</span>мини-босса</div>
                    </div>
                </div>

                <div class="enchantment-card epic">
                    <div class="rarity-badge">Эпическое</div>
                    <div class="enchantment-icon">🤝</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Братство</h3>
                    </div>
                    <span class="enchantment-type">Поддерживающее</span>
                    <p class="enchantment-description">Если пешка фракции получила негативный эффект, то урон другой пешки этой же фракции увеличивается на 15% в течение 12с. <span class="cooldown">15с кд</span></p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">+15%</span>урон</div>
                        <div class="stat"><span class="stat-value">12с</span>длительность</div>
                    </div>
                </div>

                <div class="enchantment-card epic">
                    <div class="rarity-badge">Эпическое</div>
                    <div class="enchantment-icon">✨</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Астрал</h3>
                    </div>
                    <span class="enchantment-type">Защитное</span>
                    <p class="enchantment-description">Если пешка фракции должна потерять ранг слияния, то вместо этого с шансом 25% она на 2с попадет в астрал. По окончании эффекта она не потеряет ранг слияния. <span class="cooldown">7с кд</span></p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">25%</span>шанс</div>
                        <div class="stat"><span class="stat-value">7с</span>кулдаун</div>
                    </div>
                </div>

                <div class="enchantment-card epic">
                    <div class="rarity-badge">Эпическое</div>
                    <div class="enchantment-icon">💀</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Карманное изнурение III</h3>
                        <span class="enchantment-level">Уровень 3</span>
                    </div>
                    <span class="enchantment-type">Контроль</span>
                    <p class="enchantment-description">Убийство босса пешкой этой фракции создаст в конце волны снаряд, который снижает на 25% скорость атаки пешек противника, находящихся на одной горизонтальной линии. <span class="coop-badge">Co-Op: ускоряет</span></p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">-25%</span>скорость</div>
                        <div class="stat"><span class="stat-value">1 линия</span>зона</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Легендарные зачарования -->
        <div class="rarity-section">
            <h2 class="section-title legendary-title">Легендарные</h2>
            <div class="enchantments-grid">
                <div class="enchantment-card legendary">
                    <div class="rarity-badge">Легендарное</div>
                    <div class="enchantment-icon">💰</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Щедрость</h3>
                    </div>
                    <span class="enchantment-type">Экономическое</span>
                    <p class="enchantment-description">С шансом 15% призыв пешки этой фракции вернёт 50% потраченной маны!</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">15%</span>шанс</div>
                        <div class="stat"><span class="stat-value">50%</span>возврат маны</div>
                    </div>
                </div>

                <div class="enchantment-card legendary">
                    <div class="rarity-badge">Легендарное</div>
                    <div class="enchantment-icon">🛡️</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Контрзаклятье II</h3>
                        <span class="enchantment-level">Уровень 2</span>
                    </div>
                    <span class="enchantment-type">Защитное</span>
                    <p class="enchantment-description">С шансом 20% убийство босса или мини-босса пешкой фракции снимет негативные эффекты с 1 пешки и оглушит 1 пешку противника на 8 сек. <span class="coop-badge">Co-Op: без оглушения</span></p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">20%</span>шанс</div>
                        <div class="stat"><span class="stat-value">8с</span>оглушение</div>
                    </div>
                </div>

                <div class="enchantment-card legendary">
                    <div class="rarity-badge">Легендарное</div>
                    <div class="enchantment-icon">☠️</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Карманное проклятие</h3>
                    </div>
                    <span class="enchantment-type">Контроль</span>
                    <p class="enchantment-description">Убийство босса пешкой этой фракции с шансом 20% проклянет клетку противника, снижая ранг слияния пешки через 5с. <span class="coop-badge">Co-Op: повышает ранг</span></p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">20%</span>шанс</div>
                        <div class="stat"><span class="stat-value">1-2</span>клетки</div>
                    </div>
                </div>

                <div class="enchantment-card legendary">
                    <div class="rarity-badge">Легендарное</div>
                    <div class="enchantment-icon">💨</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Подкидыш IV</h3>
                        <span class="enchantment-level">Уровень 4</span>
                    </div>
                    <span class="enchantment-type">Тактическое</span>
                    <p class="enchantment-description">Максимальный уровень подкидыша с высоким шансом срабатывания и улучшенными мини-боссами.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">25%+</span>шанс</div>
                        <div class="stat"><span class="stat-value">усиленные</span>мини-боссы</div>
                    </div>
                </div>

                <div class="enchantment-card legendary">
                    <div class="rarity-badge">Легендарное</div>
                    <div class="enchantment-icon">✨</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Чародублирование</h3>
                    </div>
                    <span class="enchantment-type">Стратегическое</span>
                    <p class="enchantment-description">При поглощении пешки фракции либо при снижении ранга слияния пешки фракции с шансом 12% призывает пешку первого ранга слияния.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">12%</span>шанс</div>
                        <div class="stat"><span class="stat-value">ранг 1</span>пешка</div>
                    </div>
                </div>

                <div class="enchantment-card legendary">
                    <div class="rarity-badge">Легендарное</div>
                    <div class="enchantment-icon">🤝</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Братство II</h3>
                        <span class="enchantment-level">Уровень 2</span>
                    </div>
                    <span class="enchantment-type">Поддерживающее</span>
                    <p class="enchantment-description">Если пешка фракции получила негативный эффект, то урон других пешек фракции увеличивается на 13% в течение 9с. <span class="cooldown">18с кд</span></p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">+13%</span>урон</div>
                        <div class="stat"><span class="stat-value">9с</span>длительность</div>
                    </div>
                </div>

                <div class="enchantment-card legendary">
                    <div class="rarity-badge">Легендарное</div>
                    <div class="enchantment-icon">⚡</div>
                    <div class="enchantment-header">
                        <h3 class="enchantment-name">Обратка</h3>
                    </div>
                    <span class="enchantment-type">Контратакующее</span>
                    <p class="enchantment-description">После оглушения урон пешки фракции растет на 80% на 6с. Также при снижении ранга слияния пешка фракции увеличивает свой урон на 40% на 6с.</p>
                    <div class="enchantment-stats">
                        <div class="stat"><span class="stat-value">+80%</span>после оглушения</div>
                        <div class="stat"><span class="stat-value">+40%</span>после слияния</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Фильтрация по редкости
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.textContent;
                
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                document.querySelectorAll('.enchantment-card').forEach(card => {
                    if (filter === 'Все') {
                        card.style.display = 'block';
                    } else if (filter === 'Обычные' && card.classList.contains('common')) {
                        card.style.display = 'block';
                    } else if (filter === 'Редкие' && card.classList.contains('rare')) {
                        card.style.display = 'block';
                    } else if (filter === 'Эпические' && card.classList.contains('epic')) {
                        card.style.display = 'block';
                    } else if (filter === 'Легендарные' && card.classList.contains('legendary')) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Анимация появления карточек
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Применяем анимацию к карточкам
        document.querySelectorAll('.enchantment-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Поиск
        const searchBox = document.querySelector('.search-box');
        searchBox.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.enchantment-card').forEach(card => {
                const name = card.querySelector('.enchantment-name').textContent.toLowerCase();
                card.style.display = name.includes(searchTerm) ? 'block' : 'none';
            });
        });
    </script>
</body>
</html>
