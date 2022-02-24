module.exports = {
    getHtml: function (list, title, description) {
      return `
      <!doctype html>
      <html>
      <head>
        <title>${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/?title=WEB">WEB</a></h1>
        <ol>
          ${list}
        </ol>
    
        <a href="/create">Create</a>
        <a href="/update?title=${title}">Update</a>
        <form action="/delete_process" method="post">
          <input type="hidden" name="title" value="${title}">
          <input type="submit" value="delete">
        </form>
    
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
    },
  
    getList: function (files) {
      var list = ``;
    
      for (var i = 0; i < files.length; i++) {
        list += `<li><a href="/?title=${files[i]}">${files[i]}</a></li>`;
      }
    
      return list;
    }
};