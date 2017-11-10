const avatars = [
    {alias: 'corn', icon: './res/icons/001-corn.png'},
    {alias: 'fried-egg', icon: './res/icons/002-fried-egg.png'},
    {alias: 'turnip', icon: './res/icons/003-turnip.png'},
    {alias: 'sandwich-1', icon: './res/icons/004-sandwich-1.png'},
    {alias: 'cupcake', icon: './res/icons/005-cupcake.png'},
    {alias: 'grapes', icon: './res/icons/006-grapes.png'},
    {alias: 'salad', icon: './res/icons/007-salad.png'},
    {alias: 'salt', icon: './res/icons/008-salt.png'},
    {alias: 'cheese', icon: './res/icons/009-cheese.png'},
    {alias: 'ice-cream', icon: './res/icons/010-ice-cream.png'},
    {alias: 'avocado', icon: './res/icons/011-avocado.png'},
    {alias: 'cake-1', icon: './res/icons/012-cake-1.png'},
    {alias: 'pumpkin', icon: './res/icons/013-pumpkin.png'},
    {alias: 'oyster', icon: './res/icons/014-oyster.png'},
    {alias: 'crab', icon: './res/icons/015-crab.png'},
    {alias: 'bell-pepper', icon: './res/icons/016-bell-pepper.png'},
    {alias: 'bread', icon: './res/icons/017-bread.png'},
    {alias: 'cake', icon: './res/icons/018-cake.png'},
    {alias: 'popcorn', icon: './res/icons/019-popcorn.png'},
    {alias: 'lemon', icon: './res/icons/020-lemon.png'},
    {alias: 'watermelon', icon: './res/icons/021-watermelon.png'},
    {alias: 'chocolate', icon: './res/icons/022-chocolate.png'},
    {alias: 'soup', icon: './res/icons/023-soup.png'},
    {alias: 'sandwich', icon: './res/icons/024-sandwich.png'},
    {alias: 'shrimp', icon: './res/icons/025-shrimp.png'},
    {alias: 'rice', icon: './res/icons/026-rice.png'},
    {alias: 'onion', icon: './res/icons/027-onion.png'},
    {alias: 'muffin', icon: './res/icons/028-muffin.png'},
    {alias: 'pear', icon: './res/icons/029-pear.png'},
    {alias: 'noodles', icon: './res/icons/030-noodles.png'},
    {alias: 'pepper', icon: './res/icons/031-pepper.png'},
    {alias: 'olive-oil', icon: './res/icons/032-olive-oil.png'},
    {alias: 'chicken-1', icon: './res/icons/033-chicken-1.png'},
    {alias: 'pizza', icon: './res/icons/034-pizza.png'},
    {alias: 'carrot', icon: './res/icons/035-carrot.png'},
    {alias: 'hamburger-1', icon: './res/icons/036-hamburger-1.png'},
    {alias: 'apple', icon: './res/icons/037-apple.png'},
    {alias: 'banana', icon: './res/icons/038-banana.png'},
    {alias: 'chicken', icon: './res/icons/039-chicken.png'},
    {alias: 'spaghetti', icon: './res/icons/040-spaghetti.png'},
    {alias: 'pineapple', icon: './res/icons/041-pineapple.png'},
    {alias: 'tomato', icon: './res/icons/042-tomato.png'},
    {alias: 'french-fries', icon: './res/icons/043-french-fries.png'},
    {alias: 'strawberry', icon: './res/icons/044-strawberry.png'},
    {alias: 'broccoli', icon: './res/icons/045-broccoli.png'},
    {alias: 'hamburger', icon: './res/icons/046-hamburger.png'},
    {alias: 'steak', icon: './res/icons/047-steak.png'},
    {alias: 'orange', icon: './res/icons/048-orange.png'},
    {alias: 'lettuce', icon: './res/icons/049-lettuce.png'},
    {alias: 'fish', icon: './res/icons/050-fish.png'},
];
export default avatars;

export function getAvatarSource(alias) {
    const avatar = avatars.find((item) => {
        return item.alias === alias;
    });
    if (avatar) {
        return avatar.icon;
    } else {
        return getRandomAvatar().icon;
    }
}

export function getRandomAvatar() {
    const random = Math.floor(Math.random() * avatars.length);
    return avatars[random];
}