(() => {
    const $ = document.querySelector.bind(document);
    let timer = 7000;
    let vol = 0.05;
    let isRotating = false;
    let currentRotate = 0;
    const wheel = $('.wheel');
    const btnStart = $('.btn-start');
    let backgroundMusic = new Audio("../audio/casino.mp3");
    backgroundMusic.volume = 0.01;
    let fadeout = setInterval(function()
        {
            if (vol < 0.25){
                vol += 0.05;
                backgroundMusic.volume = vol;
            }
            else {
                clearInterval(fadeout);
            }
        }, 200);
    backgroundMusic.play();
    const msg = $('#msg');
    const listGift = [
        {
            txtName: 'Makima',
            srcName: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dc447491-6737-4557-885d-08ec11515e82/dfg2jzq-87ecc312-f481-42b4-9183-f4296f769d53.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RjNDQ3NDkxLTY3MzctNDU1Ny04ODVkLTA4ZWMxMTUxNWU4MlwvZGZnMmp6cS04N2VjYzMxMi1mNDgxLTQyYjQtOTE4My1mNDI5NmY3NjlkNTMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.kVegFtWH-jhK58tC93x_WACcBEnf8tu9TLkCg7mAGp4',
            musicName: "audio/voices/Makima.mp3",
            percent: (100/14)/100
        },
        {
            txtName: 'Esdeath',
            srcName: 'https://www.nicepng.com/png/full/327-3274344_akame-ga-kill-akame-ga-kill-esdeath-transparent.png',
            musicName: "audio/voices/Esdeath.mp3",
            percent: (100/14)/100
        },
        {
            txtName: 'Yor',
            srcName: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d1d8a4c4-24c7-48f7-b125-d4391a955cb5/df53d3x-851416f9-29ce-4b9d-9d7a-308a48541361.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QxZDhhNGM0LTI0YzctNDhmNy1iMTI1LWQ0MzkxYTk1NWNiNVwvZGY1M2QzeC04NTE0MTZmOS0yOWNlLTRiOWQtOWQ3YS0zMDhhNDg1NDEzNjEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.n1zR3bgB_hyy6-w6z4ETuIWyIYtS6d3wLlIKTo6Z4OQ',
            musicName: "audio/voices/Yor.mp3",
            percent: (100/14)/100
        },
        {
            txtName: 'Shiro',
            srcName: 'https://www.pngkey.com/png/full/334-3346461_shiro-no-game-no-life-fanart.png',
            musicName: "audio/voices/Shiro.mp3",
            percent: (100/14)/100
        },
        {
            txtName: 'Tatsumaki',
            srcName: 'http://cdn.shopify.com/s/files/1/0631/0982/4771/products/tatsumaki.png?v=1651296763',
            musicName: "audio/voices/Tatsumaki.mp3",
            percent: (100/14)/100
        },
        {
            txtName: 'Fubuki',
            srcName: 'https://www.pngkit.com/png/full/38-383315_human-hair-color-anime-black-hair-fictional-character.png',
            musicName: "audio/voices/Fubuki.mp3",
            percent: (100/14)/100
        },
        {
            txtName: 'Mitsuri',
            srcName: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/48dca866-c9b7-4b9d-8fa4-419d40c903d4/ddwh9ng-be7f9f16-8428-40f4-9fba-59853d92d9c0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ4ZGNhODY2LWM5YjctNGI5ZC04ZmE0LTQxOWQ0MGM5MDNkNFwvZGR3aDluZy1iZTdmOWYxNi04NDI4LTQwZjQtOWZiYS01OTg1M2Q5MmQ5YzAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.0bHpEFUaPi-yfm_8JkJCMa6u31gzu43U-17Xbqr5FWE',
            musicName: "audio/voices/Mitsuri.mp3",
            percent: (100/14)/100
        },
        {
            txtName: 'Kaguya',
            srcName: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5ba22543-c5b2-486a-b9d2-95ebe36d5a87/ddzq2g1-c50517c5-95e5-475b-aeae-a7e1db6f4854.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzViYTIyNTQzLWM1YjItNDg2YS1iOWQyLTk1ZWJlMzZkNWE4N1wvZGR6cTJnMS1jNTA1MTdjNS05NWU1LTQ3NWItYWVhZS1hN2UxZGI2ZjQ4NTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.zlYZWkX2-z8HwmuxSvDAkvGc922v_dAHT1BPw826IqI',
            musicName: "audio/voices/Kaguya.mp3",
            percent: (100/14)/100
        },
        {
            txtName: 'Reze',
            srcName: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fc0bbce-4105-4dd6-a0b3-19ece80f716f/demi4vv-9409465d-1b35-457b-b638-55c10602a788.png/v1/fill/w_1280,h_1892,strp/__render___reze___chainsaw_man_by_shuyunova_demi4vv-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTg5MiIsInBhdGgiOiJcL2ZcLzJmYzBiYmNlLTQxMDUtNGRkNi1hMGIzLTE5ZWNlODBmNzE2ZlwvZGVtaTR2di05NDA5NDY1ZC0xYjM1LTQ1N2ItYjYzOC01NWMxMDYwMmE3ODgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.xJx4BNy46fTArZGRfGb44VDAWeT4lZwbli7nIRVpdmU',
            musicName: "audio/voices/Reze.mp3",
            percent: (100/14)/100
        },
        {
            txtName: 'Power',
            srcName: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/721241b4-9db1-4d32-be61-91972b14e7d2/deqhs1y-e4503d6a-2e18-4e16-a671-6d4af01c687f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcyMTI0MWI0LTlkYjEtNGQzMi1iZTYxLTkxOTcyYjE0ZTdkMlwvZGVxaHMxeS1lNDUwM2Q2YS0yZTE4LTRlMTYtYTY3MS02ZDRhZjAxYzY4N2YucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Et08ArajekBVCdJsHuwzf_3EiE2DwqIIOekadWJ7LuY',
            musicName: "audio/voices/Power.mp3",
            percent: (100/14)/100
        },
        {
            txtName: 'Astolfo',
            srcName: 'https://www.pngkit.com/png/full/570-5700392_fate-astolfo-render-by-lckiwi-ecchi-astolfo.png',
            musicName: "audio/voices/Astolfo.mp3",
            percent: (100/14)/100
        },
        {
            txtName: 'Rin',
            srcName: 'https://i.pinimg.com/originals/8f/6c/4c/8f6c4cf8bea026f4f7e884fdd28802ba.png',
            musicName: "audio/voices/Rin.mp3",
            percent: (100/14)/100
        },
        {
            txtName: 'Yumeko',
            srcName: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0c40443d-1cfc-4e9c-95c5-b7635de03d38/de8ykri-908d7750-8893-4607-ad5e-369de527007c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBjNDA0NDNkLTFjZmMtNGU5Yy05NWM1LWI3NjM1ZGUwM2QzOFwvZGU4eWtyaS05MDhkNzc1MC04ODkzLTQ2MDctYWQ1ZS0zNjlkZTUyNzAwN2MucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.6QMvm-wLGIGX81VTT10jxX2vnJUVN3DxpuiElPd2Mc0',
            musicName: "audio/voices/Yumeko.mp3",
            percent: (100/14)/100
        },

        {
            txtName: 'Megumin',
            srcName: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/71fbb00b-be92-4757-8791-0aaae3cc055d/dezzghw-df2c130c-2594-4a3d-bb8f-966a19b62b1b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcxZmJiMDBiLWJlOTItNDc1Ny04NzkxLTBhYWFlM2NjMDU1ZFwvZGV6emdody1kZjJjMTMwYy0yNTk0LTRhM2QtYmI4Zi05NjZhMTliNjJiMWIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.s7I4vyDIfd9AZ-QzVa_okTMK1eqNF-Eqhnhd3RdAoZI',
            musicName: "audio/voices/Megumin.mp3",
            percent: (100/14)/100
        }

    ];

    const size = listGift.length;
    const rotate = 360/size;
    const skewY = 90 - rotate;

    const slideValue = document.querySelector("span");
    const inputSlider = document.querySelector("input");
    inputSlider.oninput =(() => {
        let value = inputSlider.value;
        slideValue.textContent = value;
        slideValue.style.left = (value/2) + "%";
        slideValue.classList.add("show");
        backgroundMusic.volume = value/500;
    });
    inputSlider.onblur = (() => {
        slideValue.classList.remove("show");
    })

    const renderItem = () => {
        listGift.forEach((item,index)=> {
            const itemGift = document.createElement('li');
            itemGift.classList.add('gift');


            itemGift.style.transform = `
            rotate(${rotate*index}deg)
            skewY(-${skewY}deg)
            `;

            itemGift.innerHTML = `
            <p class="text-item ${index%2==0 && 'even'}"
            style="transform: skewY(${skewY}deg)
            rotate(${rotate/2}deg)"
            >
                <b>${item.txtName}</b>
                </p>
            `;
            wheel.appendChild(itemGift);
        });
    };

    const rotateWheel = (currentRotate, index) => {
        wheel.style.transform = `rotate(${
            currentRotate - index * rotate - rotate / 2
            }deg)`;
    };

    const getGift = randomNumber => {
        let currentPercent = 0;
        let list = [];

        listGift.forEach((item, index) => {
            currentPercent += item.percent;
            randomNumber <= currentPercent &&
            list.push({
                ...item,
                index
            });
        });
        return list[0];
    };

    const showTxtGift = (txt, srcName, musicName) => {
        setTimeout( () => {
            isRotating = false;
            let msg = document.createElement('H1');
            let img = document.createElement('img');
            let div = document.getElementById('reveal-box');
            let rouletteMain = document.getElementById('main-roulette');

            msg.setAttribute("id", "msg");
            rouletteMain.appendChild(msg);
            rouletteMain.appendChild(img);
            msg.innerHTML = `<center> Nouvelle maîtresse <br> ${txt} </center>`;

            let snd = new Audio(musicName);
            snd.volume = 1;
            snd.play();

            console.log(musicName);

            console.log(txt);
            setTimeout(function() {
                div.setAttribute('class', 'reveal-box');
                div.style.backgroundImage=` url(${srcName})`
            }, 1000);

            let myText = new SplitType('#msg')
            gsap.to('.char', {
                y: 0,
                stagger: 0.05,
                delay: 0.2,
                duration: .1
            })

        }, timer);
    };

    const start = () => {

        isRotating = true;
        let h1 = document.querySelector('h1');
        let img = document.getElementById('imgGift');
        h1.remove();
        const random = Math.random();
        const gift = getGift(random);

        let div = document.getElementById('reveal-box');
        div.setAttribute('class', '');
        div.style.backgroundImage='';

        console.log(gift);
        currentRotate += 360*10;
        rotateWheel(currentRotate, gift.index);
        showTxtGift(gift.txtName, gift.srcName, gift.musicName);
    };

    btnStart.addEventListener('click', () => {
        !isRotating && start();
    });
    renderItem();
})();