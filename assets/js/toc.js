document.addEventListener('DOMContentLoaded', function () {
  var content = document.querySelector('.post-content');
  var toc = document.getElementById('toc');
  var tocList = document.getElementById('toc-list');
  if (!content || !toc || !tocList) return;

  var headers = content.querySelectorAll('h2, h3');
  if (headers.length < 3) return; // not worth a TOC for short posts

  headers.forEach(function (h) {
    if (!h.id) {
      h.id = h.textContent
        .trim()
        .toLowerCase()
        .replace(/[^\w]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    var li = document.createElement('li');
    li.className = h.tagName.toLowerCase() === 'h3' ? 'toc-h3' : 'toc-h2';
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    tocList.appendChild(li);
  });

  toc.style.display = '';
});
