/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🌕',
    'X': '🛸',
    'I': '🌎',
    'PLAYER': '👾',
    'BOMB_COLLISION': '💥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
    'HEART': '💝',
};

const maps = [];
maps.push(`
    I---X-X-X-
    XXX-XXX---
    X-X-----XX
    XXXX-XXXXX
    -----XXXXX
    -XXXXXXXXX
    ---XXX-XXX
    XX-X---XXX
    X----X-X-X
    O-X-XX---X
`);
maps.push(`
    O--XX--X-X
    X--XX-X--X
    XX----XX-X
    X--XX-X-XX
    X-XXX--XXX
    X-XXXX-XXX
    X---XX--XX
    XX---XX---
    X--X---I--
    X-XX--XX-X
    `);
maps.push(`
    I-----XXXX
    --XXX-X--X
    XX----XX-X
    -X-XX-----
    XX-----X--
    -XXXXX-XXX
    XX-----XX-
    -X-XXXX---
    XX-----OXX
    --X--X---X
`);
maps.push(`
    O--X-X--X-
    XX-X-XX-XX
    XX------XX
    X-XXX-XXXX
    X-----X---
    X--X-XX--X
    --XX-----X
    -XXXXXXX--
    -X------X-
    XXIXXXX---
`);
maps.push(`
    -X-X-X-XX-
    ----------
    -XX-XXXXXX
    -X----X--X
    -X-XX---XX
    -X-XXXXXXX
    -X------XX
    -XXXXXX---
    -X-XI---XX
    --OXXXX---
`);