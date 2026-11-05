/* =====================================================
   THE PHILOSOPHY QUEST
   Core Application Logic
===================================================== */

// -------------------------
// Navigation
// -------------------------

function showPage(pageId) {

    document
        .querySelectorAll('.section')
        .forEach(section => {
            section.classList.add('hidden');
        });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.remove('hidden');
    }

    localStorage.setItem('currentPage', pageId);
}

// -------------------------
// XP SYSTEM
// -------------------------

let xp = parseInt(
    localStorage.getItem('questXP')
) || 0;

updateXP();

function awardXP(amount) {

    xp += amount;

    localStorage.setItem(
        'questXP',
        xp
    );

    updateXP();

    checkBadges();

    alert(
        `✨ You earned ${amount} XP!\n\nTotal XP: ${xp}`
    );
}

function updateXP() {

    const xpElement =
        document.getElementById('xp');

    if (xpElement) {
        xpElement.textContent = xp;
    }
}

// -------------------------
// BADGE SYSTEM
// -------------------------

const badgeRules = [
    {
        id: 'thinker',
        name: '🏅 Thinker Explorer',
        xpRequired: 50
    },
    {
        id: 'detective',
        name: '🏅 Philosophy Detective',
        xpRequired: 150
    },
    {
        id: 'escape',
        name: '🏅 Escape Survivor',
        xpRequired: 300
    },
    {
        id: 'inventory',
        name: '🏅 Inventory Master',
        xpRequired: 400
    },
    {
        id: 'reflection',
        name: '🏅 Reflection Scholar',
        xpRequired: 500
    },
    {
        id: 'master',
        name: '🏅 Master of Educational Thought',
        xpRequired: 750
    }
];

function getEarnedBadges() {

    return JSON.parse(
        localStorage.getItem(
            'earnedBadges'
        ) || '[]'
    );
}

function saveEarnedBadges(badges) {

    localStorage.setItem(
        'earnedBadges',
        JSON.stringify(badges)
    );
}

function checkBadges() {

    let earned =
        getEarnedBadges();

    badgeRules.forEach(badge => {

        const qualifies =
            xp >= badge.xpRequired;

        const alreadyEarned =
            earned.includes(
                badge.id
            );

        if (
            qualifies &&
            !alreadyEarned
        ) {

            earned.push(
                badge.id
            );

            alert(
                `🎉 New Badge Unlocked!\n\n${badge.name}`
            );
        }

    });

    saveEarnedBadges(
        earned
    );

    renderBadges();
}

function renderBadges() {

    const container =
        document.getElementById(
            'earned-badges'
        );

    if (!container) return;

    const earned =
        getEarnedBadges();

    container.innerHTML =
        '';

    badgeRules.forEach(
        badge => {

            const div =
                document.createElement(
                    'div'
                );

            div.className =
                'badge';

            if (
                earned.includes(
                    badge.id
                )
            ) {

                div.innerHTML =
                    badge.name;

            } else {

                div.innerHTML =
                    `🔒 ${badge.name}`;

                div.style.opacity =
                    '.4';
            }

            container
                .appendChild(
                    div
                );

        }
    );
}

// -------------------------
// ESCAPE ROOM LOGIC
// -------------------------

function completeEscapeRoom() {

    awardXP(
        200
    );

    localStorage.setItem(
        'escapeComplete',
        'true'
    );
}

function verifyFinalEscape() {

    const code =
        prompt(
            'Enter the Final Escape Code:'
        );

    const answer =
        'WISDOM-INQUIRY-REINFORCEMENT-TRANSFORM';

    if (
        code &&
        code
            .trim()
            .toUpperCase() === answer
    ) {

        alert(
            '🏆 You escaped the Academy!'
        );

        completeEscapeRoom();

    } else {

        alert(
            'Incorrect code. Keep investigating.'
        );
    }
}

// -------------------------
// INVENTORY COMPLETION
// -------------------------

function completeInventory() {

    awardXP(
        50
    );

    localStorage.setItem(
        'inventoryComplete',
        'true'
    );
}

// -------------------------
// DETECTIVE CASES
// -------------------------

function completeDetectiveCases() {

    awardXP(
        120
    );

    localStorage.setItem(
        'detectiveComplete',
        'true'
    );
}

// -------------------------
// REFLECTIONS
// -------------------------

function saveReflection() {

    const area =
        document.getElementById(
            'reflection-box'
        );

    if (!area) return;

    localStorage.setItem(
        'reflection',
        area.value
    );

    awardXP(
        25
    );

    alert(
        'Reflection saved.'
    );
}

function loadReflection() {

    const area =
        document.getElementById(
            'reflection-box'
        );

    if (!area) return;

    area.value =
        localStorage.getItem(
            'reflection'
        ) || '';
}

// -------------------------
// PROGRESS TRACKING
// -------------------------

function getProgress() {

    return {

        profiles:
            xp >= 50,

        detective:
            localStorage.getItem(
                'detectiveComplete'
            ) === 'true',

        inventory:
            localStorage.getItem(
                'inventoryComplete'
            ) === 'true',

        escape:
            localStorage.getItem(
                'escapeComplete'
            ) === 'true'
    };
}

function updateProgressDisplay() {

    const progress =
        getProgress();

    const container =
        document.getElementById(
            'progress-summary'
        );

    if (
        !container
    ) return;

    container.innerHTML =
`
<ul>
<li>Profiles: ${progress.profiles ? '✅' : '❌'}</li>
<li>Inventory: ${progress.inventory ? '✅' : '❌'}</li>
<li>Detective Cases: ${progress.detective ? '✅' : '❌'}</li>
<li>Escape Quest: ${progress.escape ? '✅' : '❌'}</li>
</ul>
`;
}

// -------------------------
// RESET BUTTON
// -------------------------

function resetQuest() {

    const confirmed =
        confirm(
            'Reset all Philosophy Quest progress?'
        );

    if (
        !confirmed
    ) return;

    localStorage.clear();

    location.reload();
}

// -------------------------
// INITIALIZATION
// -------------------------

window.addEventListener(
    'DOMContentLoaded',
    () => {

        const savedPage =
            localStorage.getItem(
                'currentPage'
            ) || 'home';

        showPage(
            savedPage
        );

        updateXP();

        renderBadges();

        updateProgressDisplay();

        loadReflection();

        checkBadges();
    }
);
