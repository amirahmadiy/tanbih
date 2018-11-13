var au = document.getElementById("aud");
var aus = document.getElementById("snd-src");
var anum = document.getElementById("ayah-num").valueOf().value;
var snum = document.getElementById("sura-num").valueOf().value;

ChangeSelectionSura();
SetQariTrans();
var current_trans_num = document.getElementById("trans-select").valueOf().value;
ShowAyah();

var current_page;
var current_ayah;
var current_joz;
var current_hizb;
var current_qari_num = document.getElementById("qari-select").valueOf().value;
var current_qari = QariArray[current_qari_num].EN_Name;
var repeat = document.getElementById("repeat").valueOf().value;
var ayah_sound_length = 6.725;
var paused = false;
var ayah_index = CountAyaat();
var first_ayah;
var last_ayah;
var one_or_un = true;
var site = "https://tanbih.ml/";
var net_status;
var show_type = document.getElementById("show").valueOf().value;
var sinput = document.getElementById("search-input");
sinput.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        Search();
    }
});
document.getElementById("show").oninput = function () { SetSettings(); }
document.getElementById("range").oninput = function () { SetSettings(); }
document.getElementById("repeat").oninput = function () { SetSettings(); }
document.getElementById("pause").oninput = function () { SetSettings(); }
document.getElementById("ayah-num").oninput = function () { SetSettings(); }
document.getElementById("sura-num").oninput = function () { SetSettings(); }
document.getElementById("qari-select").oninput = function () { current_qari = QariArray[this.value].EN_Name; current_qari_num = this.value; SetSettings(); }
document.getElementById("trans-select").oninput = function () { current_trans_num = this.value; SetSettings(); }
var s_end;
var quran_size = document.getElementById("quran-size").valueOf().value;
var trans_size = document.getElementById("trans-size").valueOf().value;
var quran_font = document.getElementById("quran-font").valueOf().value;
var trans_font = document.getElementById("trans-font").valueOf().value;
var quran_color = document.getElementById("quran-color").valueOf().value;
var trans_color = document.getElementById("trans-color").valueOf().value;
var select_color = document.getElementById("select-color").valueOf().value;
document.getElementById("tfont-out").innerText = trans_size;
document.getElementById("qfont-out").innerText = quran_size;
document.getElementById("quran-size").oninput = function () { quran_size = this.value; document.getElementById("qfont-out").innerText = this.value; SetDesign(); SetSettings(); }
document.getElementById("trans-size").oninput = function () { trans_size = this.value; document.getElementById("tfont-out").innerText = this.value; SetDesign(); SetSettings(); }
document.getElementById("quran-font").oninput = function () { quran_font = this.value; SetDesign(); SetSettings(); }
document.getElementById("trans-font").oninput = function () { trans_font = this.value; SetDesign(); SetSettings(); }
document.getElementById("quran-color").oninput = function () { quran_color = this.value; SetDesign(); SetSettings(); }
document.getElementById("trans-color").oninput = function () { trans_color = this.value; SetDesign(); SetSettings(); }
document.getElementById("select-color").oninput = function () { select_color = this.value; SetDesign(); SetSettings(); }
au.onloadedmetadata = function () {
    ayah_sound_length = au.duration;
}
if (Number(getCookie("quran-size")) > 0) {
    document.getElementById("ayah-num").valueOf().value = getCookie("ayah");
    document.getElementById("sura-num").valueOf().value = getCookie("sura");
    anum = getCookie("ayah");
    snum = getCookie("sura");
    ayah_index = CountAyaat();
    current_qari_num = getCookie("qari");
    current_trans_num = getCookie("trans");
    document.getElementById("range").valueOf().value = getCookie("range");
    document.getElementById("repeat").valueOf().value = getCookie("repeat");
    document.getElementById("show").valueOf().value = getCookie("show");
    document.getElementById("pause").valueOf().value = getCookie("pause");
    document.getElementById("qari-select").valueOf().value = current_qari_num;
    document.getElementById("trans-select").valueOf().value = current_trans_num;
    quran_size = getCookie("quran-size");
    quran_font = getCookie("quran-font");
    trans_font = getCookie("trans-font");
    trans_size = getCookie("trans-size");
    quran_color = getCookie("quran-color");
    trans_color = getCookie("trans-color");
    select_color = getCookie("select-color");
    ShowPage(ayah_index);
    ShowSelectedAyah(ayah_index);
    //ShowAyah();
}

SetDesign();

function ResetDesign() {
    document.getElementById("quran-size").valueOf().value = 32;
    document.getElementById("trans-size").valueOf().value = 20;
    document.getElementById("quran-font").valueOf().value = 'Neirizi';
    document.getElementById("trans-font").valueOf().value = 'Nazanin';
    document.getElementById("quran-color").valueOf().value = '#000000';
    document.getElementById("trans-color").valueOf().value = '#00007b';
    document.getElementById("select-color").valueOf().value = '#A70021';
    quran_size = document.getElementById("quran-size").valueOf().value;
    trans_size = document.getElementById("trans-size").valueOf().value;
    quran_font = document.getElementById("quran-font").valueOf().value;
    trans_font = document.getElementById("trans-font").valueOf().value;
    quran_color = document.getElementById("quran-color").valueOf().value;
    trans_color = document.getElementById("trans-color").valueOf().value;
    select_color = document.getElementById("select-color").valueOf().value;
    document.getElementById("tfont-out").innerText = 20;
    document.getElementById("qfont-out").innerText = 32;
    SetDesign();
    SetSettings();
}

function ReadOneTime(a) {
    if (QariArray[current_qari_num].Is_online) {
        if (!net_status) {
            alert("متأسفانه اتصال به سایت برقرار نشد. لطفا اتصال خود را بررسی کنید.");
            return;
        }
        aus.src = site + 'Sounds/' + current_qari + '/' + m_numbers(AyehArray[a].SoorehId) + '/' + m_numbers(AyehArray[a].SoorehId) + m_numbers(AyehArray[a].AyehId) + '.mp3';
    }
    else {
        aus.src = 'Sounds/' + current_qari_num + '/' + current_qari + '/' + m_numbers(AyehArray[a].SoorehId) + '/' + m_numbers(AyehArray[a].SoorehId) + m_numbers(AyehArray[a].AyehId) + '.mp3';
    }
    one_or_un = false;
    au.load();
    au.play();
}

var ssubject = '';

function Search() {
    aus.src = '';
    au.load();
    ssubject = document.getElementById("search-input").valueOf().value;
    if (ssubject != '') {
        if (document.getElementById("quran-s").checked == true) {
            var handle = document.getElementById("main-sec");
            show_type = "search";
            handle.innerHTML = '';
            ssubject = CleanArabicText(CleanEarab(ssubject));
            var found = new Array();
            var res = '';
            var much = 0;
            for (c = 0; c <= 6348; c++) {
                if (CleanArabicText(CleanEarab(QuranTextArray[c])).search(ssubject) > -1) {
                    found[found.length] = Coloring(QuranTextArray[c], ssubject, true);
                    much += (found[found.length - 1].match(new RegExp("<font", "g")) || []).length;
                    res += '<div dir="rtl" class="ayah"><span onclick="ReadOneTime(' + c + ');" class="ayah2" style="font: ' + quran_size + 'px ' + quran_font + '; color:' + quran_color + ';">' + found[found.length - 1] + '</span><font onclick="current_page=0; ShowPage(' + c + ');ShowSelectedAyah(' + c + ');" style="cursor:pointer;"><nobr><b style="font-size: 20px; font-family: Badr; color: #008600;">(' + SoorehArray[AyehArray[c].SoorehId].Name + ' : ' + AyehArray[c].AyehId + ') </b></nobr></font>';
                    if (current_trans_num != '000') {
                        res += '<br><p style="font: ' + trans_size + 'px ' + trans_font + '; color:' + trans_color + ';">' + TransArray[current_trans_num].Content[c] + '</p>';
                    }
                    res += '</div>';
                }
            }
            if (found.length == 0) {
                handle.innerHTML = '<h2 dir="rtl" style="text-align:center; font-size:32px; font-family:Nazanin; color:#000000;">هیچ نتیجه‌ای یافت نشد.</h2><center><a href="javascript:current_page=0;ShowPage(' + CountAyaat() + ');ShowSelectedAyah(' + CountAyaat() + ')" style="text-align:center; color: #0000ff; font-family: Nazanin; font-size: 19px; text-decoration: underline; cursor: pointer;">»»بازگشت»»</a></center>';
            }
            else {
                handle.innerHTML += '<center><span dir="rtl" style="text-align:center; font-size:20px; font-family:Nazanin; color:#000000;">تعداد <b>' + much + '</b> مورد مطابق در <b>' + found.length + '</b> آیه یافت شد.</span></center><hr style="background-color:#c0cc00;width: 100%;height: 1.5px; border: none; margin-bottom:20px;">';
                handle.innerHTML += res;
            }
        }
        else if (document.getElementById("trans-s").checked == true) {
            if (current_trans_num == '000') {
                alert("هیچ ترجمه‌ای انتخاب نشده است.");
                return;
            }
            var handle = document.getElementById("main-sec");
            show_type = "search";
            handle.innerHTML = '';
            ssubject = CleanArabicText(CleanEarab(ssubject));
            var found = new Array();
            var res = '';
            var much = 0;
            for (c = 0; c <= 6348; c++) {
                if (CleanArabicText(CleanEarab(TransArray[current_trans_num].Content[c])).search(ssubject) > -1) {
                    found[found.length] = Coloring(TransArray[current_trans_num].Content[c], ssubject, true);
                    much += (found[found.length - 1].match(new RegExp("<font", "g")) || []).length;
                    res += '<div dir="rtl" class="ayah"><span onclick="ReadOneTime(' + c + ');" class="ayah2" style="font: ' + quran_size + 'px ' + quran_font + '; color:' + quran_color + ';">' + QuranTextArray[c] + '</span><font onclick="current_page=0; ShowPage(' + c + ');ShowSelectedAyah(' + c + ');" style="cursor:pointer;"><nobr><b style="font-size: 20px; font-family: Badr; color: #008600;">(' + SoorehArray[AyehArray[c].SoorehId].Name + ' : ' + AyehArray[c].AyehId + ') </b></nobr></font>';
                    if (current_trans_num != '000') {
                        res += '<br><p style="font: ' + trans_size + 'px ' + trans_font + '; color:' + trans_color + ';">' + found[found.length - 1] + '</p>';
                    }
                    res += '</div>';
                }
            }
            if (found.length == 0) {
                handle.innerHTML = '<h2 dir="rtl" style="text-align:center; font-size:32px; font-family:Nazanin; color:#000000;">هیچ نتیجه‌ای یافت نشد.</h2><center><a href="javascript:current_page=0;ShowPage(' + CountAyaat() + ');ShowSelectedAyah(' + CountAyaat() + ')" style="text-align:center; color: #0000ff; font-family: Nazanin; font-size: 19px; text-decoration: underline; cursor: pointer;">»»بازگشت»»</a></center>';
            }
            else {
                handle.innerHTML += '<center><span dir="rtl" style="text-align:center; font-size:20px; font-family:Nazanin; color:#000000;">تعداد <b>' + much + '</b> مورد مطابق در <b>' + found.length + '</b> آیه یافت شد.</span></center><hr style="background-color:#c0cc00;width: 100%;height: 1.5px; border: none; margin-bottom:20px;">';
                handle.innerHTML += res;
            }
        }
    }

}

function CleanEarab(text) {
    text = text.replace(/ً/gi, '');
    text = text.replace(/ٌ/gi, '');
    text = text.replace(/ٍ/gi, '');
    text = text.replace(/َ/gi, '');
    text = text.replace(/ُ/gi, '');
    text = text.replace(/ِ/gi, '');
    text = text.replace(/ّ/gi, '');
    text = text.replace(/ْ/gi, '');
    return text;
}

function CleanArabicText(text) {
    text = text.replace(/أ/gi, 'ا');
    text = text.replace(/إ/gi, 'ا');
    text = text.replace(/آ/gi, 'ا');
    text = text.replace(/ؤ/gi, 'و');
    text = text.replace(/ة/gi, 'ه');
    text = text.replace(/ك/gi, 'ک');
    text = text.replace(/ی/gi, 'ي');
    text = text.replace(/ى/gi, 'ي');
    return text;
}

function CleanPersianText(text) {
    text = text.replace(/ة/gi, 'ه');
    text = text.replace(/ك/gi, 'ک');
    text = text.replace(/ی/gi, 'ي');
    text = text.replace(/ى/gi, 'ي');
    text = text.replace(/ؤ/gi, 'و');
    text = text.replace(/ّ/gi, '');
    return text;
}

function Coloring(text, word, withEarab) {
    coloredText = '';
    if (withEarab == false) {
        cleanText = CleanPersianText(text);
        cleanWord = CleanPersianText(word);
        spos = 0;
        while (cleanText.indexOf(cleanWord, spos) > -1) {
            epos = cleanText.indexOf(cleanWord, spos);
            coloredText += cleanText.substring(spos, epos);
            coloredText += '<font color=' + select_color + '>' + cleanWord + '</font>';
            spos = epos + word.length;
        }
        coloredText += cleanText.substring(spos, cleanText.length);
    } else {
        cleanText = CleanArabicText(text);
        cleanWord = CleanArabicText(word);
        var i = 0;
        var j = 0;
        var i0;
        spos = 0;
        while (i < text.length) {
            accordance = 0;
            i0 = i;
            for (j = 0; j < word.length; j += 1) {
                if (cleanText.charAt(i + j) == cleanWord.charAt(j)) {
                    accordance += 1;
                    if ('ًٌٍَُِّْ'.search(cleanText.charAt(i + j + 1)) > -1) {
                        i = i + 1;
                        if ('ًٌٍَُِّْ'.search(cleanText.charAt(i + j + 1)) > -1)
                            i = i + 1;
                    }
                } else {
                    break;
                }
            }
            if (accordance == word.length) {
                coloredText += text.substring(spos, i0);
                coloredText += '<font color=' + select_color + '>' + text.substring(i0, i + word.length) + '</font>';
                spos = i + word.length;
            }
            i = i + 1;
        }
        coloredText += text.substring(spos, text.length);
    }
    return coloredText;
}

function ShowSettingMenu() {
    var handle = document.getElementById("setting");
    if (handle.style.display == 'none') {
        handle.style.display = 'flex';
        document.getElementById("p-sec").style.width = '34vw';
        document.getElementById("set-but").innerText = '»»تنظیمات';
    }
    else {
        handle.style.display = 'none';
        document.getElementById("p-sec").style.width = '17vw'
        document.getElementById("set-but").innerText = '««تنظیمات';
    }
}

function SetDesign() {
    //ShowPage(ayah_index);
    if (current_trans_num != '000') {
        if (show_type == 'sep' || show_type == 'search') {
            var y = document.getElementsByTagName("p");
            var i;
            for (i = 0; i < y.length; i++) {
                y[i].style.color = trans_color;
                y[i].style.fontFamily = trans_font;
                y[i].style.fontSize = trans_size + 'px';
            }
        }
        else {
            var y = document.getElementById("trans-v").getElementsByTagName("span");
            var i;
            for (i = 0; i < y.length; i++) {
                y[i].style.color = trans_color;
                y[i].style.fontFamily = trans_font;
                y[i].style.fontSize = trans_size + 'px';
            }
        }
    }

    var y = document.getElementsByClassName("ayah2");
    var i;
    for (i = 0; i < y.length; i++) {
        y[i].style.color = quran_color;
        y[i].style.fontFamily = quran_font;
        y[i].style.fontSize = quran_size + 'px';
    }



    if (show_type != 'search') document.getElementById(ayah_index).style.color = select_color;
}

function SetSettings() {
    setCookie("ayah", document.getElementById("ayah-num").valueOf().value, 36500);
    setCookie("sura", document.getElementById("sura-num").valueOf().value, 36500);
    setCookie("ayaats", CountAyaat(), 36500);
    setCookie("qari", document.getElementById("qari-select").valueOf().value, 36500);
    setCookie("trans", document.getElementById("trans-select").valueOf().value, 36500);
    setCookie("range", document.getElementById("range").valueOf().value, 36500);
    setCookie("repeat", document.getElementById("repeat").valueOf().value, 36500);
    setCookie("show", document.getElementById("show").valueOf().value, 36500);
    setCookie("pause", document.getElementById("pause").valueOf().value, 36500);
    setCookie("quran-size", document.getElementById("quran-size").valueOf().value, 36500);
    setCookie("quran-font", document.getElementById("quran-font").valueOf().value, 36500);
    setCookie("trans-font", document.getElementById("trans-font").valueOf().value, 36500);
    setCookie("trans-size", document.getElementById("trans-size").valueOf().value, 36500);
    setCookie("quran-color", document.getElementById("quran-color").valueOf().value, 36500);
    setCookie("trans-color", document.getElementById("trans-color").valueOf().value, 36500);
    setCookie("select-color", document.getElementById("select-color").valueOf().value, 36500);
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function ReadAyah() {
    SetSettings();
    anum = document.getElementById("ayah-num").valueOf().value;
    snum = document.getElementById("sura-num").valueOf().value;
    ShowPage();
    ShowSelectedAyah();
    if (anum == '000') {
        if (QariArray[current_qari_num].Is_online) {
            if (!net_status) {
                alert("متأسفانه اتصال به سایت برقرار نشد. لطفا اتصال خود را بررسی کنید.");
                return;
            }
            aus.src = site + 'Sounds/' + current_qari + '/bismillah.mp3';
        }
        else {
            aus.src = 'Sounds/' + current_qari_num + '/' + current_qari + '/bismillah.mp3';
        }
        if (au.duration == "NaN") {
            return;
        }
        au.load();
        au.play();
        return;

    }
    if (QariArray[current_qari_num].Is_online) {
        if (!navigator.onLine) {
            alert("متأسفانه اتصال به سایت برقرار نشد. لطفا اتصال خود را بررسی کنید.");
            return;
        }
        aus.src = site + 'Sounds/' + current_qari + '/' + snum + '/' + snum + anum + '.mp3';
    }
    else {
        aus.src = 'Sounds/' + current_qari_num + '/' + current_qari + '/' + snum + '/' + snum + anum + '.mp3';
    }
    if (document.getElementById("ayah-num").valueOf().value == '' && Number(snum) != 114) {
        snum = m_numbers(Number(snum) + 1);
        document.getElementById("sura-num").valueOf().value = snum;
        ChangeSelectionSura();
        if (Number(snum) == 9) anum = m_numbers(1);
        else anum = m_numbers(0);
        document.getElementById("ayah-num").valueOf().value = anum;
        ReadAyah();
    }
    if (au.duration == "NaN") {
        return;
    }
    au.load();
    au.play();

}
function ContAyah() {
    if (one_or_un == false) {
        one_or_un = true;
        return;
    }
    var range = document.getElementById("range").valueOf().value;
    var pause = document.getElementById("pause").valueOf().value;
    var ayaats = CountAyaat();

    if (pause != '0' && paused == false) {
        if (pause == 'x') {
            setTimeout(ContAyah, Number(ayah_sound_length) * 1000);
        }
        else {
            setTimeout(ContAyah, Number(pause) * 1000);
        }
        paused = true;
        return;
    }
    paused = false;

    if (repeat != '0') {
        repeat--;
        ReadAyah();
        return;
    }

    if (range != 'unlimit') {
        switch (range) {
            case 'ayah':
                return;
                break;

            case 'page':
                if (AyehArray[ayaats + 1].PageId != current_page) {
                    return;
                }
                break;

            case 'sura':
                if (AyehArray[ayaats + 1].SoorehId != AyehArray[ayaats].SoorehId) {
                    return;
                }
                break;

            case 'hizb':
                if (AyehArray[ayaats + 1].HezbId != AyehArray[ayaats].HezbId) {
                    return;
                }
                break;

            case 'joz':
                if (AyehArray[ayaats + 1].HezbId != AyehArray[ayaats].HezbId && AyehArray[ayaats].HezbId % 4 == 0) {
                    return;
                }
                break;

            default:
                break;
        }
    }

    //anum = document.getElementById("ayah-num").valueOf().value;
    //snum = document.getElementById("sura-num").valueOf().value;
    /* if (Number(anum) > SoorehArray[Number(snum)].AyehCount) {
         ChangeSelectionSura();
         anum = m_numbers(AyehArray[ayah_index].AyehId);
     }*/
    anum = Number(anum) + 1;
    anum = m_numbers(anum);
    if (ayaats == '6348') return;
    if (snum < AyehArray[ayaats + 1].SoorehId) s_end = true;
    ShowPage();
    ShowSelectedAyah();
    if (QariArray[current_qari_num].Is_online) {
        if (!net_status) {
            alert("متأسفانه اتصال به سایت برقرار نشد. لطفا اتصال خود را بررسی کنید.");
            return;
        }
        aus.src = site + 'Sounds/' + current_qari + '/' + m_numbers(AyehArray[ayaats].SoorehId) + '/' + m_numbers(AyehArray[ayaats].SoorehId) + m_numbers(AyehArray[ayaats].AyehId) + '.mp3';
    }
    else {
        aus.src = 'Sounds/' + current_qari_num + '/' + current_qari + '/' + m_numbers(AyehArray[ayaats].SoorehId) + '/' + m_numbers(AyehArray[ayaats].SoorehId) + m_numbers(AyehArray[ayaats].AyehId) + '.mp3';
    }
    repeat = document.getElementById("repeat").valueOf().value;
    document.getElementById("ayah-num").valueOf().value = anum;
    document.getElementById("sura-num").valueOf().value = snum;
    ReadAyah();
}

function Read(AyahNumber) {
    document.getElementById("sura-num").valueOf().value = m_numbers(AyehArray[AyahNumber].SoorehId);
    ChangeSelectionSura();
    document.getElementById("ayah-num").valueOf().value = m_numbers(AyehArray[AyahNumber].AyehId);
    ReadAyah();
}

function ShowAyah(a) {
    if (current_page != '0') {
        aus.src = '';
        au.load();
    }
    if (show_type == "search" && a == 1) return;
    anum = document.getElementById("ayah-num").valueOf().value;
    snum = document.getElementById("sura-num").valueOf().value;
    if (Number(anum) > SoorehArray[Number(snum)].AyehCount) {
        ChangeSelectionSura();
        anum = m_numbers(AyehArray[ayah_index].AyehId);
    }
    ShowPage();
    ShowSelectedAyah();
    document.getElementById("ayah-num").valueOf().value = anum;
    document.getElementById("sura-num").valueOf().value = snum;
}

function GetHizb() {
    aus.src = '';
    au.load();
    current_hizb = document.getElementById("hizb").valueOf().value;
    current_joz = document.getElementById("joz").valueOf().value;
    var hezb = (Number(current_joz) - 1) * 4 + Number(current_hizb);
    var c;
    for (c = 1; c <= 6348; c++) {
        if (AyehArray[c].HezbId == hezb) break;
    }
    ShowPage(Number(c));
    ShowSelectedAyah(Number(c), false);
    document.getElementById("sura-num").valueOf().value = m_numbers(AyehArray[c].SoorehId);
    ChangeSelectionSura();
    document.getElementById("ayah-num").valueOf().value = m_numbers(AyehArray[c].AyehId);
}

function NextPage(scr) {
    if (current_page == '604') return;
    aus.src = '';
    au.load();
    ShowPage(++last_ayah);
    ShowSelectedAyah(first_ayah, true);
    anum = AyehArray[first_ayah].AyehId;
    snum = AyehArray[first_ayah].SoorehId;
    document.getElementById("sura-num").valueOf().value = m_numbers(snum);
    ChangeSelectionSura();
    document.getElementById("ayah-num").valueOf().value = m_numbers(anum);
    if (scr) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

function PervPage(scr) {
    if (current_page == '1') return;
    aus.src = '';
    au.load();
    ShowPage(--first_ayah);
    ShowSelectedAyah(first_ayah, true);
    anum = AyehArray[first_ayah].AyehId;
    snum = AyehArray[first_ayah].SoorehId;
    document.getElementById("sura-num").valueOf().value = m_numbers(snum);
    ChangeSelectionSura();
    document.getElementById("ayah-num").valueOf().value = m_numbers(anum);
    if (scr) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
    }
}

function ChangeSelectionSura() {
    var ayaat_list = '';
    var ayaat_count = SoorehArray[Number(document.getElementById("sura-num").valueOf().value)].AyehCount;
    if (document.getElementById("sura-num").valueOf().value != 1 && document.getElementById("sura-num").valueOf().value != 9) {
        ayaat_list += '<option value="000">0</option>';
    }
    for (c = 1; c <= ayaat_count; c++) {
        ayaat_list += '<option value="' + m_numbers(c) + '">' + String(c) + '</option>';
    }
    document.getElementById("ayah-num").innerHTML = ayaat_list;
}

function m_numbers(number) {
    if (number < 100 && number > 9) {
        number = '0' + String(number);
    }
    if (number < 10) {
        number = '00' + String(number);
    }
    return number;
}

function HizbSymbol(ayah_num) {
    if (Number(AyehArray[ayah_num - 1].HezbId) % 4 != 0) return "Files/Images/hezbSymbol.gif";
    else return "Files/Images/jozSymbol.png";
}

function GoToPage() {
    var page = prompt("شماره صفحه مورد نظرتان را وارد کنید [604 > 1] :", "");
    if (page == '' || page == null) return;
    page = Math.floor(Number(page));
    if (page > 0 && page < 605) {
        var c;
        for (c = 1; c <= 6348; c++) {
            if (AyehArray[c].PageId == page) {
                break;
            }
        }
        ShowPage(c);
        ShowSelectedAyah(c);
    }
    else {
        alert("شماره صفحه نامعتبر است.\nلطفا شماره صفحه مورد نظرتان را با کاراکتر های لاتین و بین 1 تا 604 وارد کنید.");
    }
}

function ShowPage(a) {
    if (show_type == "search") {
        show_type = document.getElementById("show").valueOf().value;
        document.getElementById("main-sec").innerHTML = '<table class="main-table" style="padding-left: 50px;padding-right: 50px;" cellpadding="0">        <tbody><tr>            <td style="width: 33.333%">                <strong id="surah-name" style="font-family: Badr; font-size: 19px;">【سورة الفاتحة】</strong>            </td>            <td style="text-align: center; width: 33.333%">                <button style="border:0px solid #00000000; background-color:#00000000;" onclick="NextPage();"><strong style="font-size : 24px; cursor: pointer;">«</strong></button>                        <button style="border:0px solid #00000000; background-color:#00000000; font-size: 16px;" onclick="GoToPage();"><strong id="page-number">1</strong></button>                <button style="border:0px solid #00000000; background-color:#00000000;" onclick="PervPage();"><strong style="font-size : 24px; cursor: pointer;">»</strong></button>            </td>            <td style="width: 33.333%; text-align: right;">                <strong id="joz-name" style="font-family: Badr; font-size: 19px;">【الجزء الاول】</strong>            </td>        </tr>    </tbody></table>    <table class="main-table" cellpadding="0">        <tbody><tr>            <td style="width : 59px; height: 59px; background-image: url(Files/Images/left_up.gif);"></td>            <td style="height: 59px; background-image: url(Files/Images/tile_up.gif);"></td>            <td style="width : 59px; height: 59px; background-image: url(Files/Images/right_up.gif);"></td>        </tr>        <tr>            <td style="width : 59px; background-image: url(Files/Images/tile_left.gif);"></td>            <td>                <div id="quran-page" class="quran-page">                </div>            </td>            <td style="width : 59px; background-image: url(Files/Images/tile_right.gif);"></td>        </tr>        <tr>            <td style="width : 59px; height: 59px; background-image: url(Files/Images/left_down.gif);"></td>            <td style="height: 59px; background-image: url(Files/Images/tile_down.gif);"></td>            <td style="width : 59px; height: 59px; background-image: url(Files/Images/right_down.gif);"></td>        </tr>    </tbody></table>    <table class="main-table" style="padding-left: 50px;padding-right: 50px;" cellpadding="0">        <tbody><tr>            <td style="text-align: center; width: 33.333%">                <button style="border:0px solid #00000000; background-color:#00000000;" onclick="NextPage(true);"><strong style="font-size : 24px; cursor: pointer;">«</strong></button>                        <button style="border:0px solid #00000000; background-color:#00000000; font-size: 16px;" onclick="GoToPage();"><strong id="page-number2">1</strong></button>                <button style="border:0px solid #00000000; background-color:#00000000;" onclick="PervPage(true);"><strong style="font-size : 24px; cursor: pointer;">»</strong></button>            </td>        </tr>    </tbody></table>';
    }
    var ayaats;
    if (a == null) ayaats = CountAyaat();
    else ayaats = a;
    if (AyehArray[ayaats].PageId == current_page) return;
    current_page = AyehArray[ayaats].PageId;
    var page_html = '';
    var found_all = false;
    ayaats -= 50;

    if (ayaats < 0) ayaats = 0;
    while (true) {
        if (AyehArray[ayaats].PageId == current_page) {
            if (found_all == false) {
                found_all = true;
                first_ayah = ayaats;
                document.getElementById("surah-name").innerText = '【سورة ' + SoorehArray[AyehArray[ayaats].SoorehId].Name + '】';
                current_joz = Math.floor(Number(AyehArray[ayaats].HezbId) / 4);
                if (Number(AyehArray[ayaats].HezbId) % 4 != 0) current_joz++;
                document.getElementById("joz-name").innerText = "【الجزء " + joz_text(Number(current_joz)) + "】";
            }

            show_type = document.getElementById("show").valueOf().value;

            if (show_type == "sep") {

                if (AyehArray[ayaats].AyehId == 0 || (AyehArray[ayaats].SoorehId == 9 && AyehArray[ayaats].AyehId == 1) || (AyehArray[ayaats].SoorehId == 1 && AyehArray[ayaats].AyehId == 1)) {
                    page_html += '<div class="sura-start"><span style="line-height:49px;">سورة ' + SoorehArray[AyehArray[ayaats].SoorehId].Name + '</span></div><center style="font-family: Badr; font-weight:bold; font-size: 17px;"> ترتيبها ' + SoorehArray[AyehArray[ayaats].SoorehId].Order + ' آياتها ' + SoorehArray[AyehArray[ayaats].SoorehId].AyehCount + ' ' + SoorehArray[AyehArray[ayaats].SoorehId].Type + '</center>';
                }
                if (AyehArray[ayaats].SymbolId == 1) {
                    page_html += '<div dir="rtl" class="ayah"><span style="height:auto; width:auto;"><img src="' + HizbSymbol(ayaats) + '"></span><span onclick="Read(' + ayaats + ');" id="' + ayaats + '" class="ayah2">' + QuranTextArray[ayaats] + '</span>';
                }
                else if (AyehArray[ayaats].SymbolId == 2) {
                    page_html += '<div dir="rtl" class="ayah"><span style="height:auto; width:auto;"></span><span onclick="Read(' + ayaats + ');" id="' + ayaats + '" class="ayah2">' + QuranTextArray[ayaats] + '<img src="Files/Images/sajdehSymbol.gif"></span>';
                }
                else {
                    page_html += '<div dir="rtl" class="ayah"><span onclick="Read(' + ayaats + ');" id="' + ayaats + '" class="ayah2">' + QuranTextArray[ayaats] + '</span>';
                }
                if (AyehArray[ayaats].AyehId != 0) {
                    page_html += '<font><nobr><b style="font-size: 20px; font-family: Arial; color: #008600;">(' + AyehArray[ayaats].AyehId + ') </b></nobr></font>';
                }
                if (current_trans_num != '000') {
                    page_html += '<br><p style="font: 20px Nazanin; color:#00007b;">' + TransArray[current_trans_num].Content[ayaats] + '</p>';
                }
                page_html += '</div>';
            }
            else if (show_type == "cons-v" && current_trans_num != "000") {
                if (page_html == '') document.getElementById("quran-page").innerHTML = '<div style="display:grid; grid-template-columns: repeat(2, 1fr); padding: 7px;"><div id="ayah-v" dir="rtl" class="ayah"></div><div id="trans-v" dir="rtl" style="font: 20px Nazanin; color:#00007b; margin: 10px 10px 20px 10px; text-align:justify;"></div></div>';
                if (AyehArray[ayaats].AyehId == 0 || (AyehArray[ayaats].SoorehId == 9 && AyehArray[ayaats].AyehId == 1) || (AyehArray[ayaats].SoorehId == 1 && AyehArray[ayaats].AyehId == 1)) {
                    if (current_trans_num != '000') {
                        document.getElementById("trans-v").innerHTML += '<div class="trans-start" style="font-size:22px; font-family:Nazanin;"><span style="line-height:49px;">سوره ' + SoorehArray[AyehArray[ayaats].SoorehId].Name + '</span></div>';
                    }
                    else {
                        document.getElementById("trans-v").style.display = "none";
                    }
                    document.getElementById("ayah-v").innerHTML += '<div class="sura-start"><span style="line-height:49px;">سورة ' + SoorehArray[AyehArray[ayaats].SoorehId].Name + '</span></div><center style="font-family: Badr; font-weight:bold; font-size: 17px !important;"> ترتيبها ' + SoorehArray[AyehArray[ayaats].SoorehId].Order + ' آياتها ' + SoorehArray[AyehArray[ayaats].SoorehId].AyehCount + ' ' + SoorehArray[AyehArray[ayaats].SoorehId].Type + '</center>';
                }
                var sym = '';
                if (AyehArray[ayaats].SymbolId == 1) {
                    if (AyehArray[ayaats].AyehId == 0) {
                        sym += '<center style="margin-bottom: 10px;"><span style="height:auto; width:auto;"><img src="' + HizbSymbol(ayaats) + '"></span>';
                    }
                    else {
                        sym += '<span style="height:auto; width:auto;"><img src="' + HizbSymbol(ayaats) + '"></span>';
                    }
                }

                if (AyehArray[ayaats].AyehId == 0) {
                    if (AyehArray[ayaats].SymbolId == 1) {
                        sym += '<span onclick="Read(' + ayaats + ');" id="' + ayaats + '" class="ayah2" style="text-align:center;">' + QuranTextArray[ayaats] + '</span></center>';
                    }
                    else {
                        sym += '<center style="margin-bottom: 10px;"><span onclick="Read(' + ayaats + ');" id="' + ayaats + '" class="ayah2" style="text-align:center;">' + QuranTextArray[ayaats] + '</span></center>';
                    }
                }
                else {
                    if (AyehArray[ayaats].SymbolId == 2) {
                        sym += '<span onclick="Read(' + ayaats + ');" id="' + ayaats + '" class="ayah2">' + QuranTextArray[ayaats] + '<img src="Files/Images/sajdehSymbol.gif"></span>';
                    }
                    else {
                        sym += '<span onclick="Read(' + ayaats + ');" id="' + ayaats + '" class="ayah2">' + QuranTextArray[ayaats] + '</span>';
                    }
                }

                document.getElementById("ayah-v").innerHTML += sym;

                if (AyehArray[ayaats].AyehId != 0) {
                    document.getElementById("ayah-v").innerHTML += '<font><nobr><b style="font-size: 20px; font-family: Arial; color: #008600;">(' + AyehArray[ayaats].AyehId + ') </b></nobr></font>';
                }
                if (current_trans_num != '000') {
                    if (AyehArray[ayaats].AyehId != '0') {
                        document.getElementById("trans-v").innerHTML += '<br><span style="font: 20px Nazanin; color:#00007b;"> ' + TransArray[current_trans_num].Content[ayaats] + '(' + AyehArray[ayaats].AyehId + ') </span><br>';
                    }
                    else {
                        document.getElementById("trans-v").innerHTML += '<br><span style="font: 20px Nazanin; color:#00007b;"> ' + TransArray[current_trans_num].Content[ayaats] + '</span><br>';
                    }
                }
                else {
                    document.getElementById("trans-v").style.display = "none";
                }
                page_html = document.getElementById("quran-page").innerHTML;
            }
            else if (show_type == "cons-h" || (show_type == "cons-v" && current_trans_num == "000")) {
                if (page_html == '') document.getElementById("quran-page").innerHTML = '<div style="display:grid; grid-template-columns: repeat(1, 1fr); padding: 7px;"><div id="ayah-v" dir="rtl" class="ayah"></div><div id="trans-v" dir="rtl" style="font: 20px Nazanin; color:#00007b; margin: 10px 10px 20px 10px; text-align:justify;"></div></div>';
                if (AyehArray[ayaats].AyehId == 0 || (AyehArray[ayaats].SoorehId == 9 && AyehArray[ayaats].AyehId == 1) || (AyehArray[ayaats].SoorehId == 1 && AyehArray[ayaats].AyehId == 1)) {
                    if (current_trans_num != '000') {
                        document.getElementById("trans-v").innerHTML += '<div class="trans-start" style="font-size:22px; font-family:Nazanin;"><span style="line-height:49px;">سوره ' + SoorehArray[AyehArray[ayaats].SoorehId].Name + '</span></div>';
                    }
                    else {
                        document.getElementById("trans-v").style.display = "none";
                    }
                    document.getElementById("ayah-v").innerHTML += '<div class="sura-start"><span style="line-height:49px;">سورة ' + SoorehArray[AyehArray[ayaats].SoorehId].Name + '</span></div><center style="font-family: Badr; font-weight:bold; font-size: 17px !important;"> ترتيبها ' + SoorehArray[AyehArray[ayaats].SoorehId].Order + ' آياتها ' + SoorehArray[AyehArray[ayaats].SoorehId].AyehCount + ' ' + SoorehArray[AyehArray[ayaats].SoorehId].Type + '</center>';
                }
                var sym = '';
                if (AyehArray[ayaats].SymbolId == 1) {
                    if (AyehArray[ayaats].AyehId == 0) {
                        sym += '<center style="margin-bottom: 10px;"><span style="height:auto; width:auto;"><img src="' + HizbSymbol(ayaats) + '"></span>';
                    }
                    else {
                        sym += '<span style="height:auto; width:auto;"><img src="' + HizbSymbol(ayaats) + '"><span style="height:100%; width:100%; text-align:center; line-height:32px; color:white; font-size:9px;">3</span></span>';
                    }
                }

                if (AyehArray[ayaats].AyehId == 0) {
                    if (AyehArray[ayaats].SymbolId == 1) {
                        sym += '<span onclick="Read(' + ayaats + ');" id="' + ayaats + '" class="ayah2" style="text-align:center;">' + QuranTextArray[ayaats] + '</span></center>';
                    }
                    else {
                        sym += '<center style="margin-bottom: 10px;"><span id="' + ayaats + '" class="ayah2" style="text-align:center;">' + QuranTextArray[ayaats] + '</span></center>';
                    }
                }
                else {
                    if (AyehArray[ayaats].SymbolId == 2) {
                        sym += '<span onclick="Read(' + ayaats + ');" id="' + ayaats + '" class="ayah2">' + QuranTextArray[ayaats] + '<img src="Files/Images/sajdehSymbol.gif"></span>';
                    }
                    else {
                        sym += '<span onclick="Read(' + ayaats + ');" id="' + ayaats + '" class="ayah2">' + QuranTextArray[ayaats] + '</span>';
                    }
                }

                document.getElementById("ayah-v").innerHTML += sym;

                if (AyehArray[ayaats].AyehId != 0) {
                    document.getElementById("ayah-v").innerHTML += '<font><nobr><b style="font-size: 20px; font-family: Arial; color: #008600;">(' + AyehArray[ayaats].AyehId + ') </b></nobr></font>';
                }
                if (current_trans_num != '000') {
                    if (AyehArray[ayaats].AyehId != '0') {
                        document.getElementById("trans-v").innerHTML += '<span style="font: 20px Nazanin; color:#00007b;"> ' + TransArray[current_trans_num].Content[ayaats] + '(' + AyehArray[ayaats].AyehId + ') </span>';
                    }
                    else {
                        document.getElementById("trans-v").innerHTML += '<span style="font: 20px Nazanin; color:#00007b;"> ' + TransArray[current_trans_num].Content[ayaats] + '</span>';
                    }
                }
                else {
                    document.getElementById("trans-v").style.display = "none";
                }
                page_html = document.getElementById("quran-page").innerHTML;
            }
        }
        else {
            if (found_all == true) {
                break;
            }
        }
        if (ayaats >= 6348) break;
        ayaats++;

    }
    document.getElementById("quran-page").innerHTML = page_html;
    document.getElementById("page-number").innerText = current_page;
    document.getElementById("page-number2").innerText = current_page;
    last_ayah = ayaats;

}

function CountAyaat() {
    var ayaats = 0;
    for (c = 1; c <= Number(snum - 1); c++) {
        ayaats += SoorehArray[c].AyehCount + 1;
    }
    ayaats += Number(anum);
    if (snum >= 9) {
        ayaats--;
    }
    return ayaats;
}

function ShowSelectedAyah(a, scroll) {
    var ayaats;
    if (a == null) ayaats = CountAyaat();
    else ayaats = a;
    ayah_index = ayaats;
    if (s_end == true && scroll != true) {
        s_end = false;
        if (snum == '114') return;
        snum = m_numbers(++snum);
        anum = '000';
        document.getElementById("sura-num").valueOf().value = snum;
        ChangeSelectionSura();
        document.getElementById("ayah-num").valueOf().value = anum;
        ayaats = CountAyaat();
        ShowPage();
        ShowSelectedAyah(ayaats);
    }
    //ShowPage(ayah_index);
    SetDesign();
    if (scroll != true && document.getElementById('auto-scroll').checked) {
        var e = document.getElementById(ayaats),
            n = document.body.getBoundingClientRect().top,
            r = e.getBoundingClientRect().top,
            a = r - n - 10;
        if (show_type == "cons-v" && current_trans_num != "000") a -= 100;
        window.scrollTo({
            top: a,
            behavior: "smooth"
        })
    }
    current_hizb = AyehArray[ayaats].HezbId;
    current_joz = Math.floor(current_hizb / 4);
    current_hizb %= 4;
    if (current_hizb % 4 == 0) current_hizb = 4;
    else current_joz++;

    document.getElementById("hizb").valueOf().value = current_hizb;
    document.getElementById("joz").valueOf().value = current_joz;

    anum = AyehArray[ayaats].AyehId;
    snum = AyehArray[ayaats].SoorehId;
    anum = m_numbers(anum);
    snum = m_numbers(snum);
    document.getElementById("sura-num").valueOf().value = snum;
    ChangeSelectionSura();
    document.getElementById("ayah-num").valueOf().value = anum;
}

function SetQariTrans() {
    var content = '';
    var c = 0;
    for (c = 0; c < QariArray.length; c++) {
        content += '<option value="' + c + '">' + QariArray[Number(c)].Name + ' - ' + QariArray[c].Type + '</option>';
    }
    document.getElementById("qari-select").innerHTML = content;
    content = '';
    for (c = 0; c < TransArray.length; c++) {
        content += '<option value="' + c + '">' + TransArray[Number(c)].Name + ' - ' + TransArray[c].Lang + '</option>';
    }
    content += '<option value="000">بدون ترجمه</option>';
    document.getElementById("trans-select").innerHTML = content;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function joz_text(number) {
    var joz_text = "";
    switch (number) {
        case 1:
            joz_text = "الأول";
            break;

        case 2:
            joz_text = "الثاني";
            break;

        case 3:
            joz_text = "الثالث";
            break;

        case 4:
            joz_text = "الرابع";
            break;

        case 5:
            joz_text = "الخامس";
            break;

        case 6:
            joz_text = "السادس";
            break;

        case 7:
            joz_text = "السابع";
            break;

        case 8:
            joz_text = "الثامن";
            break;

        case 9:
            joz_text = "التاسع";
            break;

        case 10:
            joz_text = "العاشر";
            break;

        case 11:
            joz_text = "الحادي عشر";
            break;

        case 12:
            joz_text = "الثاني عشر";
            break;

        case 13:
            joz_text = "الثالث عشر";
            break;

        case 14:
            joz_text = "الرابع عشر";
            break;

        case 15:
            joz_text = "الخامس عشر";
            break;

        case 16:
            joz_text = "السادس عشر";
            break;

        case 17:
            joz_text = "السابع عشر";
            break;

        case 18:
            joz_text = "الثامن عشر";
            break;

        case 19:
            joz_text = "التاسع عشر";
            break;

        case 20:
            joz_text = "العشرون";
            break;

        case 21:
            joz_text = "الحادي والعشرون";
            break;

        case 22:
            joz_text = "الثاني والعشرون";
            break;

        case 23:
            joz_text = "الثالث والعشرون";
            break;

        case 24:
            joz_text = "الرابع والعشرون";
            break;

        case 25:
            joz_text = "الخامس والعشرون";
            break;

        case 26:
            joz_text = "السادس والعشرون";
            break;

        case 27:
            joz_text = "السابع والعشرون";
            break;

        case 28:
            joz_text = "الثامن والعشرون";
            break;

        case 29:
            joz_text = "التاسع والعشرون";
            break;

        case 30:
            joz_text = "الثلاثون";
            break;

        default:
            break;
    }
    return joz_text;
}