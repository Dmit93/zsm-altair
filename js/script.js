"use strict";
//import { data_attr } from '../data_attr.js';


const block_all = document.querySelector('.block_all_kirpich'),
    list_kp = document.querySelector('.list_kirpich'),
    new_item = document.querySelector('.new_item'),
    prev_layout = document.querySelector('.prev_visual'),
    arr_element = [],
    data_element = [],
    arr_range = [],
    state_arr = [],
    temporal_val = [],
    dbl_arr = [],
    array_result = [],
    num_val = [],
    all_number_arr = [];
let state_lozhk = 'lozhk-1',
    perem_val = [],
    example = document.getElementById("canvas_app"),
    ctx = example.getContext('2d'),
    el_render = document.querySelector('.render_visual'),
    box_kirpich = document.querySelector('.box_kirpich'),
    line = 40,
    width_kirpich = 60,
    height_kirpich = 15,
    col = (window.outerWidth > 500) ? window.outerWidth / width_kirpich : 15;
//  col = 20;

document.querySelector('.all_add_k').addEventListener('click', function(e) {
    this.parentElement.dataset.display = false;
    document.querySelector('.list_kirpich').dataset.display = true
});

prev_layout.addEventListener('click', function(e) {
    this.closest('.block_all_kirpich').dataset.display = false;
    list_kp.dataset.display = true;
    if (document.querySelector('#all_list_kirpich').childElementCount === 0) {
        document.querySelectorAll('.list_kirpich li img').forEach(elem => {
            elem.style = '';
        });
    }
});

new_item.addEventListener('click', function(e) {
    this.closest('.block_all_kirpich').dataset.display = false;
    list_kp.dataset.display = true;
    if (document.querySelector('#all_list_kirpich').childElementCount === 0) {
        document.querySelectorAll('.list_kirpich li img').forEach(elem => {
            elem.style = '';
        });
    }
});


list_kp.addEventListener('click', work_add_item);


function work_add_item(e) {
    if (e.target.classList.contains('kirpich') || e.target.parentNode.tagName === 'LI') {
        if (document.querySelector('#all_list_kirpich').childElementCount === 0) {
            add_item(e);
            document.querySelectorAll('.menu').forEach(menu => {
                menu.removeAttribute('data-target');
            });

            setTimeout(() => draw([33, 33, 34], state_lozhk, state_arr.length === 0 ? width_kirpich : state_arr[0], state_arr.length === 0 ? height_kirpich : state_arr[1], arr_element), 500)


        } else if (document.querySelector('#all_list_kirpich').childElementCount >= 1) {
            if (!data_element.includes(e.target.getAttribute('data-name') || e.target.parentNode.getAttribute('data-name'))) {
                add_item(e);
                arr_range.length = 0;
                document.querySelectorAll('.range_element').forEach((el, ind, arr) => {
                    el.closest('.element_kirp').getAttribute('data-src').split(',').forEach((elems, index, array) => {
                        arr_range.push(50 / (arr.length + 1));
                    });
                });

                setTimeout(() => draw(arr_range, state_lozhk, state_arr.length === 0 ? width_kirpich : state_arr[0], state_arr.length === 0 ? height_kirpich : state_arr[1], arr_element), 500)

            } else {
                e.target.closest('.list_kirpich').dataset.display = false;
                block_all.dataset.display = true;
            }
        }
        document.querySelectorAll('.list_kirpich li img').forEach(i => {
            i.style = '';
        });
    }

    // if (e.target.classList.contains('range_element')) {
    //     e.target.nextElementSibling.value = e.target.value
    // }
}

function add_item(e) {
    let target = e.target.getAttribute('data-src') || e.target.parentNode.getAttribute('data-src');
    let data_name = e.target.parentNode.getAttribute('data-name') || e.target.getAttribute('data-name');
    let data_menu = e.target.parentNode.getAttribute('data-menu') || e.target.getAttribute('data-menu');
    let text_title = e.target.closest('.prev_menu__li').querySelector('p').innerText;
    let album = e.target.dataset.album || e.target.parentNode.getAttribute('data-album');
    if ((e.target.parentNode.tagName === 'LI' && e.target.parentNode.getAttribute('data-src').split(',').length > 1) || e.target.getAttribute('data-src').split(',').length > 1) {
        target.split(',').forEach(el => {
            let img = new Image();
            img.src = el;
            img.setAttribute('data-name', data_name);
            data_element.push(data_name);
            arr_element.push([img, data_name]);
        });
        document.querySelector('#all_list_kirpich').insertAdjacentHTML('beforeend', `
        <div class="element_kirp" data-id="k-${data_name}" data-src="${target}">
        <div class="element_kirp__picture">
            <img class="element_kirp__picture--img" src="${album}">
            <div class="popap_attr_element"></div>
        </div>
        <div class="element_kirp__title">
            ${text_title + '<br>(фактура) - ' + data_menu}
        </div>
        <div class="element_kirp__input flex_all">
        <input type="range" class="range_element" data-id="${data_name}">
        <input type="text" class="value_range" disabled>
        <button class="del_element" data-el="${data_name}"><img class="element_delete" data-el="${data_name}" src="img/delete.svg"></button>
        <button class="edit_element" data-el="${data_name}"><img class="element_edit" data-el="${data_name}" src="img/edit.svg"></button>
        </div>
        </div>
    `);

    } else {
        let img = new Image();
        img.src = target;
        img.setAttribute('data-name', data_name);
        data_element.push(data_name);
        arr_element.push([img, data_name]);

        document.querySelector('#all_list_kirpich').insertAdjacentHTML('beforeend', `
        <div class="element_kirp" data-id="k-${data_name}" data-src="${target}">
        <div class="element_kirp__picture">
            <img class="element_kirp__picture--img" src="${album}">
            <div class="popap_attr_element"></div>
        </div>
        <div class="element_kirp__title">
            ${text_title + '<br>(фактура) - ' + data_menu}
        </div>
        <div class="element_kirp__input flex_all">
        <input type="range" class="range_element" data-id="${data_name}">
        <input type="text" class="value_range" disabled>
        <button class="del_element" data-el="${data_name}"><img class="element_delete" data-el="${data_name}" src="img/delete.svg"></button>
        <button class="edit_element" data-el="${data_name}"><img class="element_edit" data-el="${data_name}" src="img/edit.svg"></button>
        </div>
        </div>
    `);
    }

    e.target.closest('.list_kirpich').dataset.display = false;
    block_all.dataset.display = true;
}

block_all.addEventListener('input', function(e) {
    if (e.target.classList.contains('range_element')) {
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
                    }
                    /* Застрял на проблеме - нужно сохранять старое значение массива perem_val */
                }
                val_input.push([i, index, i.value]);
            });
        }
        perem_val = [];
    }
});



window.addEventListener('change', function(e) {

    if (e.target.classList.contains('range_element')) {
        if (document.getElementsByClassName('range_element').length > 1) {
            arr_range.length = 0;
            if (e.target.closest('.element_kirp').hasAttribute('data-src')) {

                document.querySelectorAll('.range_element').forEach(el => {
                    if (el.closest('.element_kirp').hasAttribute('data-src') === false) {
                        arr_range.push(el.value)
                    } else {
                        for (var i = 0; i < el.closest('.element_kirp').dataset.src.split(',').length; i++) {
                            arr_range.push(el.value / el.closest('.element_kirp').dataset.src.split(',').length);
                        }
                    }
                });

            } else {
                document.querySelectorAll('.range_element').forEach(el => {
                    if (el.closest('.element_kirp').hasAttribute('data-src') !== false) {
                        for (var i = 0; i < el.closest('.element_kirp').dataset.src.split(',').length; i++) {
                            arr_range.push(el.value / 2);
                        }
                    } else {
                        arr_range.push(el.value)
                    }

                });

            }

            draw(arr_range, state_lozhk, state_arr.length === 0 ? width_kirpich : state_arr[0], state_arr.length === 0 ? height_kirpich : state_arr[1], arr_element)
        } else {
            arr_range.length = 0
            if (e.target.closest('.element_kirp').hasAttribute('data-src')) {
                for (var i = 0; i < 2; i++) {
                    arr_range.push(e.target.value / 2);
                }
                draw(e.target.value, state_lozhk, state_arr.length === 0 ? width_kirpich : state_arr[0], state_arr.length === 0 ? height_kirpich : state_arr[1], arr_element)
            } else {
                arr_range.push(e.target.value);
                draw(e.target.value, state_lozhk, state_arr.length === 0 ? width_kirpich : state_arr[0], state_arr.length === 0 ? height_kirpich : state_arr[1], arr_element)
            }
        }
    }
});


/* Фукнция рандомного числа */
// function getUniques(min, max, n) {
//     n = n || 1;
//     if (n > max - min + 1 || n < 0) return [];
//     let t = [];
//     for (var i = 0; i < n; ++i) {
//         let a = Math.round(Math.random() * (max - min)) + min;
//         if (t[a]) --i;
//         t[a] = 1;
//     }
//     let ret = [];
//     for (i in t) ret[ret.length] = ~~i;
//     return ret;
// }


function getUniques(min, max) {
    let random_start = min, // От какого генерировать
        random_end = max, // До какого генерировать
        array = [];


    for (var i = random_start; i <= random_end; i++) {
        array.push(i);
    }

    return array
        .map(function(elem, index) { return [elem, Math.random()] })
        .sort(function(a, b) { return a[1] - b[1] })
        .map(function(elem) { return elem[0] })
}






document.querySelector('#link_jpg').addEventListener('click', function(e) {
    var link = document.getElementById('link_jpg');
    link.setAttribute('download', 'picture.png');
    link.setAttribute('href', example.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream"));
});

document.querySelector('#link_pdf').addEventListener('click', function(e) {
    let pdf = new jsPDF();
    pdf.addImage(example.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream"), 'JPEG', 15, 40, 180, 100);

    // var callAddFont = function() {
    //     this.addFileToVFS('NotoSans-Regular-normal.ttf', font);
    //     this.addFont('NotoSans-Regular-normal.ttf', 'NotoSans-Regular', 'normal');
    // };
    // jsPDF.API.events.push(['addFonts', callAddFont])

    // pdf.addFileToVFS('PTSans-Regular-normal.ttf', PTSans);
    // // pdf.addFileToVFS("../fonts/PTSans-Regular.ttf", PTSans);
    // pdf.addFont('../fonts/PTSans-Regular.ttf', 'PTSans', 'normal');

    // pdf.setFont('PTSans'); // set font
    // pdf.setFontSize(10);
    pdf.text("А ну чики брики и в дамки!", 10, 10);
    //pdf.text('Перевязка', 0, 200);
    pdf.save('picture.pdf');
});

function line_transform(val, i, j) {
    if (val === undefined || val === 'lozhk-1' || val === '') {
        if (i % 2 === 1) {
            if (j === 0) {
                ctx.translate(width_kirpich / 2, 0);
            }
        } else {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    } else if (val === 'lozhk-2') {
        if (i % 4 === 1 || i % 4 === 2 || i % 4 === 3) {
            if (j === 0) {
                ctx.translate('-' + (width_kirpich / 3.8), 0);
            }
        } else if (i % 4 === 0) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    } else if (val === 'lozhk-3') {
        if (i % 2 === 1) {
            if (j === 0) {
                ctx.translate('-' + (width_kirpich / 3.8), 0);
            }
        } else {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    } else if (val === 'tichk') {
        if (i % 2 === 1) {
            if (j === 0) {
                ctx.translate(-25, 0);
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
        state_lozhk = i.getAttribute('data-prv');
        if (i.getAttribute('data-prv') === 'tichk') {
            col = window.outerWidth / 40;
            if (document.querySelector('#all_list_kirpich').childElementCount > 1) {
                draw(arr_range, i.getAttribute('data-prv'), 30, 15, arr_element);
            } else {
                draw([33, 33, 33], i.getAttribute('data-prv'), 30, 15, arr_element);
            }
            state_arr.length = 0;
            state_arr.push(30, 15);
        } else {
            if (document.querySelector('#all_list_kirpich').childElementCount > 1) {
                draw(arr_range, i.getAttribute('data-prv'), width_kirpich, height_kirpich, arr_element);
            } else {
                draw([33, 33, 33], i.getAttribute('data-prv'), width_kirpich, height_kirpich, arr_element);
            }
            state_arr.length = 0;
            state_arr.push(width_kirpich, height_kirpich);
        }

    });
});



function slice_arr(arr, col_iter, size) {
    let array_n = [];
    for (let i = 0; i <= col_iter; i++) {
        if (i === 0) {
            array_result.length = 0;
            array_n.push(arr.slice((i * size[i]), size[i]));
            array_result.push(size[i]);
        } else if (i >= 2) {
            let arr_numb = [];
            let arr_reduc = array_result.reduce((q, w, i, arr) => {
                if (i === arr.length - 1) {
                    arr_numb.push(w);
                }
                return q + w;
            });
            array_n.push(arr.slice(arr_reduc, arr_reduc + size[i]));
            array_result.push(size[i]);
        } else {
            array_n.push(arr.slice((array_result[i - 1]), size[i] + array_result[i - 1]));
            array_result.push(size[i]);
        }



    }

    return array_n;
    //return array_result;
}





function draw(quantity, type_kladka, width, height, ...element) {
    ctx.clearRect(0, 0, 1400, 620);

    let quantity_numbers = [];

    if (typeof(quantity) === 'string') {
        if (element[0].length > 1) {
            element[0].forEach((i, ind, arr) => {
                // quantity_numbers.push(Math.ceil((col / 100) * (100 / arr.length)));
                quantity_numbers.push((col / 100) * (100 / arr.length));
            })
        } else {
            quantity_numbers.push(100)
        }

    } else if (typeof(quantity) === 'object') {
        quantity.forEach((elem, index) => {
            // quantity_numbers.push(Math.ceil((col / 100) * elem))
            quantity_numbers.push((col / 100) * elem)
        });
    }

    //console.log(quantity_numbers, type_kladka, width, height, ...element)


    // for (var el = 0; el < quantity.length; el++) {
    //     //num_val.push([getUniques(0, col, (col / 100) * parseInt(quantity[el])), element[0].length === 1 ? element[0][0][1] : element[0][el][1]]);
    //     num_val.push(getUniques(0, col, (col / 100) * parseInt(quantity[el])));
    // }



    for (var i = 0; i < line; i++) {

        for (var j = 0; j < col; j++) {
            num_val.length = 0;
            all_number_arr.length = 0;
            num_val.push(getUniques(0, col - 1));
            all_number_arr.push(slice_arr(num_val[0], quantity_numbers.length - 1, quantity_numbers));
            // console.log(all_number_arr)
            line_transform(type_kladka, i, j);

            all_number_arr[0].forEach((el, index) => {
                all_number_arr[0][index].forEach((elem, ind, arr) => {
                    if (elem === j) {
                        ctx.drawImage(element[0][index][0], 0, 0, width, height, j * (width + 2), i * (height + 2), width, height);
                        ctx.shadowColor = "#000000b3";
                        ctx.shadowBlur = 1;
                        ctx.shadowOffsetX = -1;
                        ctx.shadowOffsetY = 1;
                    }
                })
            });

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
        document.querySelector('#canvas_app').style.background = 'url(' + color + ')';
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

document.querySelectorAll('.all_factur').forEach(i => {
    i.addEventListener('click', function(e) {
        i.nextElementSibling.classList.toggle('active');
    });
});


let id_edit;

function edit_item(e) {
    if (e.target.className === 'element_edit') {
        let id = e.target.getAttribute('data-el');
        let index = data_element.indexOf(id);
        document.querySelectorAll('.section_line_kirpich > div').forEach(el => {
            el.setAttribute('data-display', 'false');
        });
        document.querySelector('.list_kirpich').setAttribute('data-display', 'true');
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

        document.querySelectorAll('.list_kirpich li img').forEach(elem => {
            if (data_element.includes(id)) {
                elem.style.pointerEvents = 'none';
            } else {
                elem.style = '';
            }

        });


        document.querySelectorAll('#all_list_kirpich .element_kirp').forEach(elem => {
            if (elem.getAttribute('data-id') === 'k-' + id) {
                elem.remove();
            }
        });

    }
}

function delete_item(e) {
    if (e.target.className === 'element_delete') {
        let id = e.target.getAttribute('data-el');
        let element = e.target.closest('.element_kirp').querySelector('.element_kirp__picture img');
        if (e.target.closest('.element_kirp').hasAttribute('data-src')) {

            e.target.closest('.element_kirp').dataset.src.split(',').forEach(els => {
                delete_data_arr(e.target.getAttribute('data-el'));
                delete_arr_element(e.target.getAttribute('data-el'));
            });
        } else {
            delete_data_arr(id);
            delete_arr_element(id);
        }

        e.target.closest('.element_kirp').remove();

        arr_range.length = 0;

        if (document.querySelectorAll('.range_element').length > 1) {
            let amount_element = document.querySelector('#all_list_kirpich').childElementCount;
            document.querySelectorAll('.range_element').forEach(el => {
                if (el.closest('.element_kirp').hasAttribute('data-src') === false) {
                    arr_range.push(el.value)
                } else {
                    for (var i = 0; i < el.closest('.element_kirp').dataset.src.split(',').length; i++) {
                        arr_range.push((100 / amount_element) / el.closest('.element_kirp').dataset.src.split(',').length);
                    }
                }
            });
        } else {
            arr_range.push(33, 33, 34)
        }



        if (document.querySelector('#all_list_kirpich').childElementCount === 0) {
            document.querySelectorAll('.section_line_kirpich div').forEach(i => {
                i.setAttribute('data-display', 'false');
            });
            document.querySelector('.section_line_kirpich').setAttribute('data-display', 'true');
            document.querySelector('.first_cheme').setAttribute('data-display', 'true');
            draw();
            document.querySelectorAll('.menu_all_kirp').forEach(elem => {
                elem.classList.remove('active');
            });
            state_arr.length = 0;
            state_arr.push(width_kirpich, height_kirpich);
            state_lozhk = 'lozhk-1';
        } else {
            setTimeout(() => draw(arr_range, state_lozhk, state_arr.length === 0 ? width_kirpich : state_arr[0], state_arr.length === 0 ? height_kirpich : state_arr[1], arr_element), 100);
        }
    }
}


function delete_data_arr(arg) {
    let index = data_element.indexOf(arg);
    if (data_element.includes(arg)) {
        if (index !== -1) {
            data_element.splice(index, 1);
        }
    }
}

function delete_arr_element(arg) {
    arr_element.forEach((i, ind) => {
        arr_element[ind].some((al, index) => {
            if (al === arg) {
                arr_element.splice(ind, 1);
            }
        });
    });
    // arr_element.filter((i, index) => {

    //     if (i[0].getAttribute('data-name').includes(arg)) {
    //         console.log(arg)
    //         arr_element.splice(index, 1);
    //     }
    // });
    // for (let f = 0; f < arr_element.length; f++) {
    //     if (arr_element[f][0].length !== 0) {
    //         if (arr_element[f][0].getAttribute('data-name').includes(arg)) {
    //             arr_element.splice(f, 1);
    //         }
    //     }
    // }
}

document.querySelector('.container_element').addEventListener('click', function(e) {
    delete_item(e);
    edit_item(e);
});

document.querySelector('.popap_open_section').addEventListener('click', function(e) {
    if (this.getAttribute('data-visual') === 'false') {
        this.setAttribute('data-visual', 'true');
        this.innerHTML = '<img src="img/close-eyes.svg">Вернуться';
        document.querySelector('.sidebar_left').style.opacity = 0;
    } else {
        this.setAttribute('data-visual', 'false');
        this.innerHTML = '<img src="img/focus.svg">Просмотр';
        document.querySelector('.sidebar_left').style.opacity = 1;
    }

});
