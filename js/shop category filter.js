document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.e-loop-item').forEach(item => {
        const classList = Array.from(item.classList);

        const productCategorySlugs = classList
            .filter(cls => cls.startsWith('product_cat-'))
            .map(cls => cls.replace('product_cat-', '').trim());

        console.log('💡 Product slugs:', productCategorySlugs);

        const categoryIcons = item.querySelectorAll('[data-category]');

        categoryIcons.forEach(icon => {
            const iconSlug = icon.getAttribute('data-category')?.trim();
            const iconLi = icon.closest('li');

            const match = productCategorySlugs.includes(iconSlug);
            console.log(`🔍 Checking icon: ${iconSlug} — Match? ${match}`);

            if (!match && iconLi) {
                iconLi.style.display = 'none';
                iconLi.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            }
        });

        // 🔒 Hide the "Shop All" menu item in the loop item only
        const shopAll = item.querySelector('.shop-all');
        if (shopAll) {
            const shopAllLi = shopAll.closest('li');
            if (shopAllLi) {
                shopAllLi.style.display = 'none';
            }
        }
    });
});