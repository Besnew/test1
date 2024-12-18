       const anchors = document.querySelectorAll('a[href*="#"]');

        anchors.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const progressRate = Math.min(progress / duration, 1);
                    const easeInOutQuad = progressRate < 0.5 ? 2 * progressRate * progressRate : 1 - Math.pow(-2 * progressRate + 2, 2) / 2;
                    window.scrollTo(0, startPosition + distance * easeInOutQuad);

                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }

                window.requestAnimationFrame(step);
            });
        });
        let currentIndex = 0;
        const slides = document.querySelectorAll('.careers__slide');
        const totalSlides = slides.length;
        const visibleSlides = 3;

        document.querySelector('#prev').addEventListener('click', () => {
            moveSlide(-1);
        });

        document.querySelector('#next').addEventListener('click', () => {
            moveSlide(1);
        });

        document.querySelector('#nextMob').addEventListener('click', () => {
            moveSlide(1);
        });

        function moveSlide(n) {
            currentIndex += n;
            if (currentIndex < 0) {
                currentIndex = totalSlides - visibleSlides;
            } else if (currentIndex >= totalSlides - visibleSlides + 1) {
                currentIndex = 0;
            } else if (window.innerWidth < 658) {
                updateSlidePositionMobile();
                return;
            } else if (window.innerWidth < 800) {
                updateSlidePositionTablet();
                return;
            }
            updateSlidePosition();
        }

        function updateSlidePosition() {
            document.querySelector('.careers__slidebar').style.transform = `translateX(-${currentIndex * 420}px)`
        }

        function updateSlidePositionTablet() {
            document.querySelector('.careers__slidebar').style.transform = `translateY(-${currentIndex * 475}px)`

        }
        function updateSlidePositionMobile() {
            document.querySelector('.careers__slidebar').style.transform = `translateY(-${currentIndex * 432}px)`

        }

        document.querySelector('.application__form').addEventListener('submit', function (event) {
            event.preventDefault();

            const inputs = document.querySelectorAll('.application__form-inputfield[required], .application__form-checkbox input[required]');

            let allValid = true;

            inputs.forEach(input => {
                const parent = input.closest('.application__form-input, .application__form-checkbox');

                if (input.type === 'checkbox' && !input.checked) {
                    parent.classList.add('invalid');
                    allValid = false;
                } else if (input.type !== 'checkbox' && !input.value.trim()) {
                    parent.classList.add('invalid');
                    allValid = false;
                } else {
                    parent.classList.remove('invalid');
                }
            });

            if (allValid) {
                this.submit();
            }
        });


        function toggleMenu() {
            const menu = document.querySelector('.menu');
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
        }


        function toggleAccordion(element) {
            const content = element.nextElementSibling;

            if (content.style.display === 'flex') {
                content.style.display = 'none';
                element.classList.remove('bold');
            } else {
                document.querySelectorAll('.accordion-content').forEach(item => item.style.display = 'none');
                document.querySelectorAll('.accordion-title').forEach(title => title.classList.remove('bold'));

                content.style.display = 'flex';
                element.classList.add('bold');
            }
        }
