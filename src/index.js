const getData = async (url) => {
    try {
        const data = await fetch(url);
        //   console.log(data.json());
        return data;
    } catch (e) {
        console.log("There was an error fetching the data: " + error)
    }
}

getData("https://api.github.com/users/cfsfines")
    .then((response) => response.json())
    .then((value) => {
        $('#pfp').attr("src", value.avatar_url)
        $('#bio').html(value.bio)
    })


$(".sliding-link").click(function (e) {
    e.preventDefault();
    var aid = $(this).attr("href");
    $('html,body').animate({ scrollTop: $(aid).offset().top }, 'slow');
});

$('#resume').click(() => {
    window.location.href = '../download/resume.pdf'
})

$('.github').click(() => {
    window.location.href = 'https://github.com/cfsfines'
})

$('#linkedinProfile').click(() => {
    window.location.href = 'https://www.linkedin.com/in/christopher-fines-133637194/'
})

$('#idaPro').click(() => {
    window.location.href = 'https://hex-rays.com/ida-pro/'
})

$('#matlab').click(() => {
    window.location.href = 'https://www.mathworks.com/products/matlab.html'
})

$('#unity').click(() => {
    window.location.href = 'https://unity.com/'
})

$('#kali').click(() => {
    window.location.href = 'https://www.kali.org/'
})

$('#wireshark').click(() => {
    window.location.href = 'https://www.wireshark.org/'
})

$('#ubuntu').click(() => {
    window.location.href = 'https://ubuntu.com/'
})

$('#msaccess').click(() => {
    window.location.href = 'https://www.microsoft.com/en-us/microsoft-365/access'
})

$('#rockwell').click(() => {
    window.location.href = 'https://www.rockwellautomation.com/en-us/products/software/arena-simulation.html'
})

$('#java').click(() => {
    console.log('clicked')
    window.location.href = 'https://www.java.com/en/'
})

$('#spring').click(() => {
    window.location.href = 'https://spring.io/projects/spring-boot'
})

$('#postgresql').click(() => {
    window.location.href = 'https://www.postgresql.org/'
})

$('#maven').click(() => {
    window.location.href = 'https://maven.apache.org/'
})

$('#postman').click(() => {
    window.location.href = 'https://www.postman.com/'
})

$('#eclipse').click(() => {
    window.location.href = 'https://www.eclipse.org/'
})

$('#csharp').click(() => {
    window.location.href = 'https://dotnet.microsoft.com/en-us/languages/csharp'
})

$('#dcfas').click(() => {
    window.location.href = 'https://dcfas.saccounty.net/Pages/Home.aspx'
})

$('#sheriff').click(() => {
    window.location.href = 'https://www.sacsheriff.com/pages/civil_bureau.php'
})

$('#social-media-api').click(() => {
    fadeOut(createSocialMediaApiDiv, '.projects-div-body')
})

$('#kizuna').click(() => {
    fadeOut(createKizuna, '.projects-div-body')
})

$('#inside-pacific').click(() => {
    fadeOut(createInsidePacific, '.projects-div-body')
})

$('#office-assistant').click(() => {
    fadeOut(dcfas, '.experience-div-body')
})

$('#account-clerk').click(() => {
    fadeOut(sheriff, '.experience-div-body')
})

$('#graduate-assistant').click(() => {
    fadeOut(gradAssistant, '.experience-div-body')
})

const fadeOut = (content, container) => {
    $(`${container}`).animate({ 'opacity': 0 }, 100, function () {
        $(this).html(content)
    }).animate({ 'opacity': 1 }, 100);
}