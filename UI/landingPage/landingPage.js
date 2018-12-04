const nav = document.querySelector('header');
        addNavBorder = () => {
        if (scrollY > 15) {
            nav.classList.add('add-border');
            console.log(scrollY)
        }else {
            nav.classList.remove('add-border');
        }
        }