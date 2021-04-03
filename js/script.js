"use strict";
//import { data_attr } from '../data_attr.js';

const block_all = document.querySelector('.block_all_kirpich'),
    list_kp = document.querySelector('.list_kirpich'),
    new_item = document.querySelector('.new_item'),
    arr_element = [],
    data_element = [];

document.querySelector('.all_add_k').addEventListener('click', function(e) {
    this.parentElement.dataset.display = false;
    document.querySelector('.list_kirpich').dataset.display = true
});

new_item.addEventListener('click', function(e) {
    this.closest('.block_all_kirpich').dataset.display = false;
    list_kp.dataset.display = true;
});



/* Возможная функция -  при наведение всплывает окно с данными */
//console.log(data_attr.k1);

// document.querySelector('.section_line_kirpich').addEventListener('mouseover', function(e) {
//     hover_attr(e)
// });



// function hover_attr(e) {
//     if (e.target.classList.contains('element_kirp__picture')) {
//         let id = e.target.closest('.element_kirp').dataset.id;
//         let spl_id = id.slice(2);
//         console.log(spl_id);

//         e.target.nextElementSibling.insertAdjacentHTML('beforeend', `
//            <span class="el_id__popap">${id}</span>
//            <p class="title_popap">${data_attr[spl_id]}</p>
//         `);
//     }
// }

list_kp.addEventListener('click', function(e) {
    if (e.target.classList.contains('kirpich')) {
        if (document.querySelector('#all_list_kirpich').childElementCount === 0) {
            let img = new Image();
            img.src = e.target.getAttribute('data-src');
            img.setAttribute('data-name', e.target.getAttribute('data-name'));
            data_element.push(e.target.getAttribute('data-name'));
            arr_element.push([img, e.target.getAttribute('data-name')]);
            document.querySelector('#all_list_kirpich').insertAdjacentHTML('beforeend', `
                <div class="element_kirp" data-id="k-${e.target.getAttribute('data-name')}">
                    <div class="element_kirp__picture">
                        <img class="element_kirp__picture--img" src="${e.target.src}">
                        <div class="popap_attr_element"></div>
                    </div>
                    <div class="element_kirp__title">
                        ${e.target.previousElementSibling.innerText}
                    </div>
                    <div class="element_kirp__input flex_all">
                        <input type="range" class="range_element" data-id="${e.target.getAttribute('data-name')}">
                        <input type="text" class="value_range" disabled>
                        <button class="del_element" data-el="${e.target.getAttribute('data-name')}"><img class="element_delete" data-el="${e.target.getAttribute('data-name')}" src="img/delete.svg"></button>
                        <button class="edit_element" data-el="${e.target.getAttribute('data-name')}"><img class="element_edit" src="img/edit.svg"></button>
                    </div>
                </div>
                `);
            e.target.closest('.list_kirpich').dataset.display = false;
            block_all.dataset.display = true;
            document.querySelectorAll('.menu').forEach(menu => {
                menu.removeAttribute('data-target');
            });

        } else {
            if (!data_element.includes(e.target.getAttribute('data-name'))) {
                let img = new Image();
                img.src = e.target.getAttribute('data-src');
                img.setAttribute('data-name', e.target.getAttribute('data-name'));
                data_element.push(e.target.getAttribute('data-name'));
                arr_element.push([img, e.target.getAttribute('data-name')]);
                document.querySelector('#all_list_kirpich').insertAdjacentHTML('beforeend', `
        <div class="element_kirp" data-id="k-${e.target.getAttribute('data-name')}">
            <div class="element_kirp__picture">
                <img class="element_kirp__picture--img" src="${e.target.src}">
                <div class="popap_attr_element"></div>
            </div>
            <div class="element_kirp__title">
                ${e.target.previousElementSibling.innerText}
            </div>
            <div class="element_kirp__input flex_all">
            <input type="range" class="range_element" data-id="${e.target.getAttribute('data-name')}">
            <input type="text" class="value_range" disabled>
            <button class="del_element" data-el="${e.target.getAttribute('data-name')}"><img class="element_delete" data-el="${e.target.getAttribute('data-name')}" src="img/delete.svg"></button>
            <button class="edit_element" data-el="${e.target.getAttribute('data-name')}"><img class="element_edit" src="img/edit.svg"></button>
        </div>
        </div>
    `);
                e.target.closest('.list_kirpich').dataset.display = false;
                block_all.dataset.display = true;
            } else {
                e.target.closest('.list_kirpich').dataset.display = false;
                block_all.dataset.display = true;
            }

        }
    }

    if (e.target.classList.contains('range_element')) {
        e.target.nextElementSibling.value = e.target.value
    }
});
let perem_val = [],
    dbl_arr = [];

block_all.addEventListener('input', function(e) {
    if (e.target.classList.contains('range_element')) {
        // arr_element.push(e.target.closest('.element_kirp').querySelector('img'));
        const val_input = [];
        let vremen = perem_val[0];
        e.target.nextElementSibling.value = e.target.value;
        if (document.querySelector('#all_list_kirpich').childElementCount > 1) {
            perem_val.push(e.target.closest('.element_kirp').getAttribute('data-id'));
            document.querySelectorAll('.range_element').forEach((i, index, arr) => {

                if (i.getAttribute('data-id') !== e.target.getAttribute('data-id')) {
                    if (e.target.getAttribute('data-id') !== perem_val[0]) {
                        i.value = (100 - e.target.value) / parseInt(arr.length - 1);
                        i.nextElementSibling.value = i.value;
                        // console.log(perem_val);
                    }
                    /* Застрял на проблеме - нужно сохранять старое значение массива perem_val */
                }
                val_input.push([i, index, i.value]);
            });
            // val_input.map(function(item, i, array) {
            //     console.log(item);
            // });

            // val_input.reduce((prev, item) => {
            //     console.log(item)
            // });
        }
        perem_val = [];
    }
});


// document.querySelectorAll('.range_element').forEach((el, index) => {
//     console.log(arr_new);
//     if (el.getAttribute('data-id') === arr_element[index][1]) {

//         arr_new.unshift(arr_element[index]);
//     } else {
//         console.log(arr_element[index]);
//         arr_new.push(arr_element[index]);
//     }

// });

const arr_range = [];
window.addEventListener('change', function(e) {
    if (e.target.classList.contains('range_element')) {
        if (document.getElementsByClassName('range_element').length > 1) {
            arr_range.length = 0;
            document.querySelectorAll('.range_element').forEach(el => {

                arr_range.push(el.value)
            });
            console.log(arr_range, arr_element)
            draw(arr_range, '', arr_element)
        } else {
            arr_range.push(e.target.value);
            draw(e.target.value, '', arr_element)
        }
    }
});

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }


/* Фукнция рандомного числа */
function getUniques(min, max, n) {
    n = n || 1;
    if (n > max - min + 1 || n < 0) return [];
    let t = [];
    for (var i = 0; i < n; ++i) {
        let a = Math.round(Math.random() * (max - min)) + min;
        if (t[a]) --i;
        t[a] = 1;
    }
    let ret = [];
    for (i in t) ret[ret.length] = ~~i;
    return ret;
}

var example = document.getElementById("canvas_app"),
    ctx = example.getContext('2d'),
    el_render = document.querySelector('.render_visual'),
    box_kirpich = document.querySelector('.box_kirpich'),
    line = Math.round((window.outerHeight / 38)),
    col = Math.round(window.outerWidth / 90);

// ctx.globalCompositeOperation = 'destination-over'
// Now draw!



// function color_show(color) {
//     // ctx.globalCompositeOperation = 'source-in'
//     ctx.fillStyle = color === undefined ? '#000' : color;
//     ctx.fillRect(0, 0, canvas_app.width, canvas_app.height);
// }

function line_transform(val, i, j) {
    if (val === undefined || val === 'lozhk-1' || val === '') {
        if (i % 2 === 1) {
            if (j === 0) {
                ctx.translate(-45, 0);
            }
        } else {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    } else if (val === 'lozhk-2') {
        if (i % 2 === 0) {
            if (j === 0) {
                ctx.translate(-25, 0);
            }
        } else if (i % 3 === 1) {
            if (j === 0) {
                ctx.translate(-45, 0);
            }
        } else if (i % 4 === 0) {
            if (j === 0) {
                ctx.translate(-65, 0);
            }
        } else {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }

}

document.querySelectorAll('.section_line_prv li').forEach(i => {
    i.addEventListener('click', function(e) {
        document.querySelectorAll('.section_line_prv li').forEach(el => {
            el.classList.remove('active')
        });
        i.classList.add('active');
        draw(arr_range, i.getAttribute('data-prv'), arr_element);
    });
});


function draw(quantity, type_kladka, ...element) {
    ctx.clearRect(0, 0, 1400, 620);
    //  ctx.clearRect(0, 0, 1620, 2480);
    // console.log(element);
    // let t = [...quantity];

    // t.filter( (el, index, arr) => {
    //    if (el > el[index]){
    //        console.log(el);
    //    }
    // });

    let num_val = [];

    for (var el = 0; el < quantity.length; el++) {
        num_val.push([getUniques(0, col, (col / 100) * parseInt(quantity[el])), element[0].length === 1 ? element[0][0][1] : element[0][el][1]]);



    }






    for (var i = 0; i < line; i++) {
        for (var j = 0; j < col; j++) {


            line_transform(type_kladka, i, j);
            var rand_numb = 0;
            if (element.length > 0) {

                for (let s = 0; s < element[0].length; s++) {
                    // num_val[s][0].forEach( (elem, indx) => {
                    //     console.log(elem);
                    // });
                    rand_numb = 0;
                    rand_numb = getUniques(0, element[0].length - 1, 1);


                    // num_val[1].find(fillter => {
                    //     if (fillter === element[0][s][1]) {

                    //         if (num_val[s][0].includes(j)) {
                    //             ctx.drawImage(element[0][s][0], 0, 0, 90, 25, j * 92, i * 27, 90, 25);
                    //         }
                    //     } else {
                    //         ctx.drawImage(element[0][parseInt(rand_numb)][0], 0, 0, 90, 25, j * 92, i * 27, 90, 25);
                    //     }
                    // });

                    // if (element[0][s][1] === num_val[s][1]) {


                    // }

                    // for (let q = 0; q < num_val.length; q++) {
                    if (num_val[s][0].includes(j)) {
                        ctx.drawImage(element[0][s][0], 0, 0, 90, 25, j * 92, i * 27, 90, 25);
                    } else {
                        ctx.drawImage(element[0][rand_numb][0], 0, 0, 90, 25, j * 92, i * 27, 90, 25);
                    }
                    // }

                    //  console.log(element[0]);
                    // if (num_val[s][0].includes(j)) {
                    //     ctx.drawImage(element[0][s][0], 0, 0, 90, 25, j * 92, i * 27, 90, 25);
                    // } else {
                    //     ctx.drawImage(element[0][parseInt(rand_numb)][0], 0, 0, 90, 25, j * 92, i * 27, 90, 25);
                    // }
                    //   console.log(element[0][s][0]);
                    //   for (var el = 0; el < num_val.)

                }
            }

        }
    }

}


document.querySelector('.prv_menu').addEventListener('click', function(e) {
    document.querySelectorAll('.box_kirpich > div').forEach(i => {
        i.dataset.display = 'false'
    });
    document.querySelector('.section_line_prv').dataset.display = 'true'
});

document.querySelector('.show_menu').addEventListener('click', function(e) {
    document.querySelectorAll('.box_kirpich > div').forEach(i => {
        i.dataset.display = 'false'
    });
    document.querySelector('.section_line_show').dataset.display = 'true'
});

document.querySelector('.kiprich_menu').addEventListener('click', function(e) {
    document.querySelectorAll('.box_kirpich > div').forEach(i => {
        i.dataset.display = 'false'
    });
    document.querySelector('.section_line_kirpich').dataset.display = 'true'
});

document.querySelectorAll('.section_line_show li').forEach(i => {
    i.addEventListener('click', function(e) {
        document.querySelectorAll('.section_line_show li').forEach(el => {
            el.classList.remove('active');
        });
        i.classList.add('active');
        let color = i.getAttribute('data-color');
        document.querySelector('#canvas_app').style.background = color;
    });
});

document.querySelectorAll('.menu').forEach(i => {
    i.addEventListener('click', function(e) {
        document.querySelectorAll('.menu').forEach(el => {
            el.classList.remove('menu_active');
        });
        i.classList.add('menu_active');
    });
});



function delete_item(e) {
    if (e.target.className === 'element_delete') {
        let id = e.target.getAttribute('data-el');
        let element = e.target.closest('.element_kirp').querySelector('.element_kirp__picture img');
        let index = data_element.indexOf(id);
        if (data_element.includes(id)) {
            if (index !== -1) {
                data_element.splice(index, 1);
            }
        }
        for (let f = 0; f < arr_element.length; f++) {
            if (arr_element[f][0].length !== 0) {
                if (arr_element[f][0].getAttribute('data-name').includes(id)) {
                    arr_element.splice(f, 1);
                }
            }
        }

        e.target.closest('.element_kirp').remove();

    }
}

document.querySelector('.container_element').addEventListener('click', function(e) {
    delete_item(e);
});