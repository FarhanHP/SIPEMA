(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{113:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n(0),r=n.n(c),i=n(13),l=n.n(i),s=n(160),o=n(185),j=n(187),u=n(14),d=n(17),b=n(7),h=n(60),O=n(186),x=n(157),p=n(23),m=function(e){return e.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)},f="https://sipema.herokuapp.com/",g="sipema.herokuapp.com",v=n(39),y=n.n(v),k=n(53),w=function(){var e=Object(k.a)(y.a.mark((function e(t,n,a,c,r){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",S(t,n,a,JSON.stringify(c),r));case 1:case"end":return e.stop()}}),e)})));return function(t,n,a,c,r){return e.apply(this,arguments)}}(),S=function(){var e=Object(k.a)(y.a.mark((function e(t,n,a,c,r){var i;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,{method:n,mode:"cors",cache:"no-cache",credentials:"same-origin",headers:a,redirect:"follow",referrerPolicy:"no-referrer",body:c,signal:r}).catch((function(e){console.warn("Fetch 1 error: ".concat(e.message))}));case 2:return i=e.sent,e.abrupt("return",i);case 4:case"end":return e.stop()}}),e)})));return function(t,n,a,c,r){return e.apply(this,arguments)}}(),C=function(e){return S("".concat(f,"b/user/logout"),"DELETE",{token:e})},T=n(189),E=n(153);function P(e){var t=e.severity,n=e.title,c=e.body;return Object(a.jsxs)(T.a,{severity:t,children:[Object(a.jsx)(E.a,{children:n}),c]})}var M=function(){return window.localStorage.getItem("login_token")},A=function(e){window.localStorage.setItem("login_token",e)},R=function(){window.localStorage.removeItem("login_token")};function U(){var e=Object(c.useState)(null),t=Object(b.a)(e,2),n=t[0],i=t[1],l=Object(c.useState)(null),s=Object(b.a)(l,2),o=s[0],d=s[1],g=Object(c.useState)(!1),v=Object(b.a)(g,2),y=v[0],k=v[1],S=Object(c.useState)(null),C=Object(b.a)(S,2),T=C[0],E=C[1],M=r.a.createRef(),R=r.a.createRef(),U=function(){var e=M.current.value,t=R.current.value;E(null),i(null),d(null),e.length<=0?i("Tidak boleh kosong"):m(e)?t.length<=0?d("Tidak boleh kosong"):(k(!0),function(e,t){return w("".concat(f,"b/user/login"),"POST",{"Content-Type":"application/json"},{email:e,password:t})}(e,t).then((function(e){500===e.status?(E("Terjadi masalah, mohon coba lagi nanti."),k(!1)):e.status>=400?(E("Email atau password salah."),k(!1)):e.json().then((function(e){A(e.token),window.location.href="/"}))}))):i("Email tidak berlaku")};return Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(p.a,{children:Object(a.jsx)("title",{children:"Login SIPEMA"})}),Object(a.jsx)(j.a,{display:"flex",minHeight:"100vh",width:"100%",children:Object(a.jsxs)(j.a,{margin:"auto",width:"320px",p:"10px",children:[Object(a.jsx)(h.a,{variant:"h5",align:"center",gutterBottom:!0,children:"SIPEMA"}),Object(a.jsx)(h.a,{align:"center",gutterBottom:!0,children:"Sistem Informasi Pengajian Musholla Al-Ikhlas"}),T?Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(P,{severity:"error",title:"Login Error",body:T})}):null,Object(a.jsx)(j.a,{my:"40px",children:Object(a.jsx)(O.a,{fullWidth:!0,label:"Email",placeholder:"Masukan email anda...",inputRef:M,error:n,helperText:n,onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),U())}})}),Object(a.jsx)(j.a,{my:"40px",children:Object(a.jsx)(O.a,{fullWidth:!0,label:"Password",type:"password",placeholder:"Masukan password anda...",inputRef:R,error:o,helperText:o,onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),U())}})}),Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(x.a,{variant:"contained",color:"primary",fullWidth:!0,disabled:y,onClick:U,children:y?"MENCOBA MASUK...":"MASUK"})}),Object(a.jsx)(h.a,{gutterBottom:!0,variant:"body1",align:"center",children:Object(a.jsx)(u.b,{to:"/password/reset",children:"Lupa Password"})}),Object(a.jsxs)(h.a,{gutterBottom:!0,variant:"body1",align:"center",children:["Belum punya akun ? ",Object(a.jsx)(u.b,{to:"/register",children:"Daftar"})]})]})})]})}function B(){return Object(a.jsx)(j.a,{display:"flex",minHeight:"100vh",width:"100%",children:Object(a.jsxs)(j.a,{margin:"auto",children:[Object(a.jsx)(h.a,{variant:"h5",align:"center",gutterBottom:!0,children:"ERROR 404: Halaman yang kamu cari tidak ditemukan :("}),Object(a.jsx)(h.a,{variant:"h6",align:"center",gutterBottom:!0,children:Object(a.jsx)(u.b,{href:"/",children:g})})]})})}function I(){var e=Object(c.useState)(null),t=Object(b.a)(e,2),n=t[0],i=t[1],l=Object(c.useState)(null),s=Object(b.a)(l,2),o=s[0],d=s[1],g=Object(c.useState)(null),v=Object(b.a)(g,2),y=v[0],k=v[1],S=Object(c.useState)(null),C=Object(b.a)(S,2),T=C[0],E=C[1],M=Object(c.useState)(!1),A=Object(b.a)(M,2),R=A[0],U=A[1],B=Object(c.useState)(null),I=Object(b.a)(B,2),N=I[0],D=I[1],G=Object(c.useState)(null),H=Object(b.a)(G,2),L=H[0],F=H[1],W=r.a.createRef(),K=r.a.createRef(),z=r.a.createRef(),_=r.a.createRef(),J=function(){var e=W.current.value,t=K.current.value,n=z.current.value,a=_.current.value;i(null),d(null),k(null),E(null),D(null),F(null),e.length<=0?i("Tidak boleh kosong"):m(e)?t.length<=0?d("Tidak boleh kosong"):n.length<8?k("Password tidak boleh kurang dari 8 karakter"):n!==a?(E("Harus sama"),k("Harus sama")):(U(!0),function(e,t,n){return w("".concat(f,"b/user/register/request"),"POST",{"Content-Type":"application/json"},{email:e,fullname:t,password:n})}(e,t,n).then((function(e){500===e.status?F("Terjadi masalah, mohon coba lagi nanti."):409===e.status?i("Email sudah dipakai"):D("Silakan cek email anda untuk verifikasi"),U(!1)}))):i("Email tidak berlaku")};return Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(p.a,{children:Object(a.jsx)("title",{children:"Daftar SIPEMA"})}),Object(a.jsx)(j.a,{display:"flex",minHeight:"100vh",width:"100%",children:Object(a.jsxs)(j.a,{margin:"auto",width:"320px",p:"10px",children:[Object(a.jsx)(h.a,{variant:"h5",align:"center",gutterBottom:!0,children:"SIPEMA"}),Object(a.jsx)(h.a,{align:"center",gutterBottom:!0,children:"Sistem Informasi Pengajian Musholla Al-Ikhlas"}),N?Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(P,{severity:"success",title:"Berhasil Mendaftar",body:N})}):L?Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(P,{severity:"error",title:"Gagal Mendaftar",body:L})}):null,Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(O.a,{label:"Email",placeholder:"Masukan email anda...",fullWidth:!0,inputRef:W,error:n,helperText:n,onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),J())}})}),Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(O.a,{label:"Nama lengkap",placeholder:"Masukan nama lengkap anda...",fullWidth:!0,inputRef:K,error:o,helperText:o,onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),J())}})}),Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(O.a,{label:"Password",type:"password",placeholder:"Masukan password anda...",fullWidth:!0,inputRef:z,error:y,helperText:y,onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),J())}})}),Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(O.a,{label:"Ulangi password",placeholder:"Ulangi password anda...",fullWidth:!0,inputRef:_,error:T,type:"password",helperText:T,onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),J())}})}),Object(a.jsx)(j.a,{mt:"40px",children:Object(a.jsx)(x.a,{variant:"contained",color:"primary",fullWidth:!0,disabled:R,onClick:J,children:R?"MENDAFTAR...":"DAFTAR"})}),Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsxs)(h.a,{align:"center",children:["Sudah punya akun ? ",Object(a.jsx)(u.b,{to:"/login",children:"Login"})]})})]})})]})}var N=n(152),D=n(158);function G(){var e=Object(c.useState)(null),t=Object(b.a)(e,2),n=t[0],i=t[1],l=Object(c.useState)(!1),s=Object(b.a)(l,2),o=s[0],d=s[1],g=Object(c.useState)(null),v=Object(b.a)(g,2),y=v[0],k=v[1],S=Object(c.useState)(null),C=Object(b.a)(S,2),T=C[0],E=C[1],M=r.a.createRef(),A=function(){i(null),k(null),E(null);var e=M.current.value;e.length<=0?i("Tidak boleh kosong"):m(e)?(d(!0),function(e){return w("".concat(f,"b/user/password/reset"),"POST",{"Content-Type":"application/json"},{email:e})}(e).then((function(e){500===e.status?k("Terjadi masalah, mohon coba lagi nanti."):404===e.status?k("Email tidak terdaftar."):E("Silakan cek email anda. Jika tidak ada, coba cek folder spam."),d(!1)}))):i("Email tidak berlaku")};return Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(p.a,{children:Object(a.jsx)("title",{children:"Lupa Password SIPEMA"})}),Object(a.jsxs)(j.a,{display:"flex",minHeight:"100vh",width:"100%",flexDirection:"column",children:[Object(a.jsx)(j.a,{p:{xs:"0",sm:"10px"},children:Object(a.jsx)(N.a,{component:u.b,to:"/login",children:Object(a.jsx)(D.a,{})})}),Object(a.jsxs)(j.a,{margin:"auto",width:"320px",p:"10px",children:[Object(a.jsx)(h.a,{variant:"h5",align:"center",gutterBottom:!0,children:"Lupa Password Akun SIPEMA"}),Object(a.jsx)(h.a,{align:"center",gutterBottom:!0,children:"Anda akan dikirimi email yang berisi tautan untuk mengganti password anda."}),T?Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(P,{severity:"success",title:"Permintaan reset password berhasil",body:T})}):y?Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(P,{severity:"error",title:"Permintaan reset password gagal",body:y})}):null,Object(a.jsx)(j.a,{my:"40px",children:Object(a.jsx)(O.a,{label:"Email",placeholder:"Masukan email anda...",fullWidth:!0,inputRef:M,error:n,helperText:n,onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),A())}})}),Object(a.jsx)(j.a,{display:"flex",flexDirection:"row-reverse",children:Object(a.jsx)(x.a,{variant:"contained",color:"primary",fullWidth:!0,disabled:o,onClick:A,children:o?"MERESET PASSWORD...":"RESET PASSWORD"})})]})]})]})}var H=n(159);function L(){return Object(a.jsx)(j.a,{display:"flex",minHeight:"100vh",width:"100%",children:Object(a.jsx)(j.a,{margin:"auto",children:Object(a.jsx)(H.a,{number:100})})})}function F(){var e=Object(d.g)().token,t=Object(c.useState)(null),n=Object(b.a)(t,2),r=n[0],i=n[1],l=Object(c.useState)(!0),s=Object(b.a)(l,2),o=s[0],u=s[1];return Object(c.useEffect)((function(){u(!0),function(e){return S("".concat(f,"b/user/register/token/").concat(e),"PUT")}(e).then((function(e){500===e.status?(i("ERROR 500: Terjadi masalah, mohon coba lagi nanti."),u(!1)):401===e.status?(i("ERROR 401: Token sudah kadaluarsa."),u(!1)):403===e.status?(i("ERROR 403: Token tidak berlaku."),u(!1)):e.json().then((function(e){A(e.token),window.location.href="/"}))}))}),[e]),o?Object(a.jsx)(L,{}):r?Object(a.jsx)(j.a,{display:"flex",minHeight:"100vh",width:"100%",children:Object(a.jsxs)(j.a,{margin:"auto",children:[Object(a.jsx)(h.a,{variant:"h5",align:"center",gutterBottom:!0,children:r}),Object(a.jsx)(h.a,{variant:"h6",align:"center",gutterBottom:!0,children:Object(a.jsx)("a",{href:"/",children:g})})]})}):Object(a.jsx)("p",{children:"Success"})}function W(){var e=Object(d.g)().token,t=Object(c.useState)(!0),n=Object(b.a)(t,2),i=n[0],l=n[1],s=Object(c.useState)(null),o=Object(b.a)(s,2),m=o[0],v=o[1],y=Object(c.useState)(!1),k=Object(b.a)(y,2),C=k[0],T=k[1],E=Object(c.useState)(null),M=Object(b.a)(E,2),A=M[0],R=M[1],U=Object(c.useState)(null),B=Object(b.a)(U,2),I=B[0],N=B[1],D=Object(c.useState)(null),G=Object(b.a)(D,2),H=G[0],F=G[1],W=Object(c.useState)(null),K=Object(b.a)(W,2),z=K[0],_=K[1],J=r.a.createRef(),Y=r.a.createRef();Object(c.useEffect)((function(){l(!0),function(e){return S("".concat(f,"b/user/password/reset/check/token/").concat(e),"GET")}(e).then((function(e){500===e.status?v("ERROR 500: Terjadi masalah, mohon coba lagi nanti."):401===e.status?v("ERROR 401: Token kadaluarsa."):404===e.status&&v("ERROR 404: Token tidak valid."),l(!1)}))}),[e]);var q=function(){F(null),_(null),R(null),N(null);var t=J.current.value,n=Y.current.value;t.length<8?R("Panjang password tidak boleh kurang dari 8 karakter"):t!==n?(R("Harus sama"),N("Harus sama")):(T(!0),function(e,t){return w("".concat(f,"b/user/password/reset/token/").concat(e),"PUT",{"Content-Type":"application/json"},{password:t})}(e,t).then((function(e){500===e.status?_("Terjadi masalah, mohon coba lagin nanti."):404===e.status?_("Token tidak valid."):401===e.status?_("Token telah kadaluarsa."):F(Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(h.a,{gutterBottom:!0,children:"Silakan login dengan password baru anda."}),Object(a.jsx)(j.a,{display:"flex",children:Object(a.jsx)(j.a,{margin:"auto",children:Object(a.jsx)(x.a,{color:"primary",component:u.b,to:"/login",children:"LOGIN"})})})]})),T(!1)})))};return i?Object(a.jsx)(L,{}):m?Object(a.jsx)(j.a,{display:"flex",minHeight:"100vh",width:"100%",children:Object(a.jsxs)(j.a,{margin:"auto",p:"10px",children:[Object(a.jsx)(h.a,{variant:"h5",align:"center",gutterBottom:!0,children:m}),Object(a.jsx)(h.a,{variant:"h6",align:"center",gutterBottom:!0,children:Object(a.jsx)(u.b,{to:"/",children:g})})]})}):Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(p.a,{children:Object(a.jsx)("title",{children:"Ganti Password SIPEMA"})}),Object(a.jsx)(j.a,{display:"flex",minHeight:"100vh",width:"100%",children:Object(a.jsxs)(j.a,{margin:"auto",p:"10px",width:"320px",children:[Object(a.jsx)(h.a,{align:"center",variant:"h5",gutterBottom:!0,children:"Ganti Password Akun SIPEMA"}),H?Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(P,{severity:"success",title:"Berhasil Mengganti Password",body:H})}):z?Object(a.jsx)(P,{severity:"error",title:"Gagal Mengganti Password",body:z}):null,Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(O.a,{type:"password",fullWidth:!0,label:"Password Baru",placeholder:"Masukan password baru anda...",error:A,helperText:A,inputRef:J,onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),q())}})}),Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(O.a,{type:"password",fullWidth:!0,label:"Ulangi Password",placeholder:"Ulangi password baru anda...",error:I,helperText:I,inputRef:Y,onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),q())}})}),Object(a.jsx)(j.a,{my:"40px",children:Object(a.jsx)(x.a,{fullWidth:!0,variant:"contained",color:"primary",disabled:C,onClick:q,children:C?"MENGGANTI PASSWORD...":"GANTI PASSWORD"})})]})})]})}var K=n(18),z=function(e){return{type:"LOG_IN",payload:e}};function _(){var e=M(),t=Object(K.c)((function(e){return e.loginUser})),n=Object(c.useState)(!1),r=Object(b.a)(n,2),i=r[0],l=r[1];return Object(a.jsx)(j.a,{display:"flex",minHeight:"100vh",width:"100%",children:Object(a.jsxs)(j.a,{margin:"auto",width:"320px",children:[Object(a.jsx)(h.a,{gutterBottom:!0,align:"center",children:"Selamat datang di SIPEMA"}),Object(a.jsx)(j.a,{mb:"30px"}),Object(a.jsx)(h.a,{variant:"h5",align:"center",gutterBottom:!0,children:t.fullname}),Object(a.jsx)(j.a,{mb:"30px"}),Object(a.jsx)(h.a,{gutterBottom:!0,align:"center",children:"Pendaftaran Anda belum disetujui, silakan hubungi guru anda."}),Object(a.jsx)(j.a,{mb:"40px"}),Object(a.jsx)(j.a,{my:"40px",display:"flex",children:Object(a.jsx)(j.a,{margin:"auto",children:Object(a.jsx)(x.a,{color:"primary",disabled:i,onClick:function(){l(!0),C(e).then((function(e){e.ok&&(R(),window.location.href="/login"),l(!1)}))},children:i?"LOGGING OUT...":"LOG OUT"})})})]})})}var J=n(171),Y=n(161),q=n(162),V=n(191),$=n(195),Q=n(87),X=n(164),Z=n(193),ee=n(163),te=Object(s.a)((function(){return{root:{backgroundColor:"white"}}}));function ne(e){var t=te(),n=e.loginUser,i=Object(c.useState)(null),l=Object(b.a)(i,2),s=l[0],o=l[1],d=Object(c.useState)(!1),h=Object(b.a)(d,2),O=h[0],p=h[1],m=Object(c.useState)(null),f=Object(b.a)(m,2),g=f[0],v=f[1],y=e.onMenuButtonClick;return Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(Y.a,{className:t.root,elevation:1,children:Object(a.jsxs)(q.a,{children:[Object(a.jsx)(j.a,{width:"50%",display:"flex",children:Object(a.jsx)(V.a,{mdUp:!0,children:Object(a.jsx)(N.a,{size:"small",onClick:y,children:Object(a.jsx)(ee.a,{})})})}),Object(a.jsx)(j.a,{width:"50%",display:"flex",flexDirection:"row-reverse",children:Object(a.jsxs)("div",{children:[Object(a.jsx)(N.a,{onClick:function(e){o(e.currentTarget)},size:"small",children:Object(a.jsx)($.a,{src:n.pp,children:n.fullname.charAt(0)})}),Object(a.jsxs)(Q.a,{open:s,onClose:function(){o(null)},anchorEl:s,children:[Object(a.jsx)(X.a,{component:u.b,to:"/profile",children:"Profil"}),Object(a.jsx)(X.a,{component:x.a,onClick:function(){p(!0),C(M()).then((function(e){e.ok?(R(),window.location.href="/"):(v("Gagal Log Out."),p(!1))}))},disabled:O,children:O?"Logging Out...":"Log Out"})]})]})})]})}),Object(a.jsx)(Z.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:g,onClose:function(){v(null)},message:g,autoHideDuration:6e3})]})}var ae=n(194),ce=n(173),re=n(192),ie=n(172),le=n(156),se=n(116),oe=n(166),je=n(168),ue=n(167),de=n(169),be=n(170),he=n(165),Oe=Object(s.a)((function(){return{listBtn:{color:"black",fontWeight:"bold"},listItemIcon:{color:"black"},activeLink:{backgroundColor:he.a[100],borderRadius:"0 20px 20px 0"}}}));function xe(){var e=Oe();return Object(a.jsxs)(le.a,{children:[Object(a.jsxs)(se.a,{button:!0,className:e.listBtn,component:u.c,exact:!0,to:"/",activeClassName:e.activeLink,children:[Object(a.jsx)(oe.a,{className:e.listItemIcon,children:Object(a.jsx)(ue.a,{})}),Object(a.jsx)(je.a,{primary:"Pengumuman"})]}),Object(a.jsxs)(se.a,{button:!0,className:e.listBtn,component:u.c,to:"/students",activeClassName:e.activeLink,children:[Object(a.jsx)(oe.a,{className:e.listItemIcon,children:Object(a.jsx)(de.a,{})}),Object(a.jsx)(je.a,{primary:"Manajemen Murid"})]}),Object(a.jsxs)(se.a,{button:!0,className:e.listBtn,component:u.c,to:"/payment",activeClassName:e.activeLink,children:[Object(a.jsx)(oe.a,{className:e.listItemIcon,children:Object(a.jsx)(be.a,{})}),Object(a.jsx)(je.a,{primary:"Riwayat Pembayaran Murid"})]}),Object(a.jsxs)(se.a,{button:!0,className:e.listBtn,component:u.c,to:"/log",activeClassName:e.activeLink,children:[Object(a.jsx)(oe.a,{className:e.listItemIcon,children:Object(a.jsx)(J.a,{})}),Object(a.jsx)(je.a,{primary:"Log Aktivitas Pengguna"})]})]})}var pe=Object(s.a)((function(){return{root:{backgroundColor:"white"}}}));function me(e){var t=e.loginUser,n=Object(c.useState)(!1),i=Object(b.a)(n,2),l=i[0],s=i[1],o=pe(),d=Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsxs)(j.a,{display:"flex",children:[Object(a.jsx)(V.a,{mdUp:!0,children:Object(a.jsx)(j.a,{my:"auto",children:Object(a.jsx)(N.a,{onClick:function(){s(!1)},children:Object(a.jsx)(ie.a,{})})})}),Object(a.jsx)(j.a,{p:"20px",children:Object(a.jsx)(h.a,{variant:"h4",children:"SIPEMA"})})]}),Object(a.jsx)(x.a,{component:u.b,to:"/profile",children:Object(a.jsxs)(j.a,{display:"flex",children:[Object(a.jsx)($.a,{src:t.pp,children:t.fullname.charAt(0)}),Object(a.jsx)(j.a,{ml:"10px",my:"auto",width:"200px",children:Object(a.jsx)(ae.a,{title:t.fullname,children:Object(a.jsx)(h.a,{variant:"h6",noWrap:!0,children:t.fullname})})})]})}),Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(ce.a,{})}),"teacher"===t.role?Object(a.jsx)(xe,{}):null]});return Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(ne,{loginUser:t,onMenuButtonClick:function(){s(!0)}}),Object(a.jsx)(V.a,{smDown:!0,children:Object(a.jsx)(re.a,{variant:"permanent",children:d})}),Object(a.jsx)(V.a,{mdUp:!0,children:Object(a.jsx)(re.a,{open:l,onClose:function(){s(!1)},children:d})}),Object(a.jsx)(j.a,{className:o.root,width:"100%",minHeight:"100vh",children:Object(a.jsx)(j.a,{pt:"90px",ml:{md:"290px"},px:"10px",children:e.children})})]})}var fe=n(174),ge=n(175),ve=n(35),ye=n.n(ve);function ke(e){var t=e.icon,n=e.title;return Object(a.jsxs)(fe.a,{container:!0,children:[Object(a.jsx)(fe.a,{item:!0,xs:12,sm:8,children:Object(a.jsxs)(j.a,{display:"flex",children:[Object(a.jsx)(j.a,{my:"auto",mr:"10px",children:t}),Object(a.jsx)(h.a,{variant:"h4",children:n})]})}),Object(a.jsx)(V.a,{only:"xs",children:Object(a.jsx)(fe.a,{item:!0,sm:4,children:Object(a.jsxs)(j.a,{display:"flex",flexDirection:"row-reverse",width:"100%",height:"100%",children:[Object(a.jsx)(j.a,{my:"auto",children:Object(a.jsx)(h.a,{children:ye()().format("ll")})}),Object(a.jsx)(j.a,{mr:"10px",display:"flex",alignItems:"center",children:Object(a.jsx)(ge.a,{})})]})})})]})}var we=function(e,t,n){return w("".concat(f,"b/log/get/").concat(t,"/").concat(n),"GET",{token:e})},Se=n(176),Ce=n(177),Te=n(178),Ee=n(179),Pe=n(180),Me=n(181),Ae=n(182),Re=n(6),Ue=n(196),Be=n(115),Ie=Object(Re.a)({missingOppositeContent:{"&:before":{display:"none"}}})(Se.a),Ne=Object(s.a)((function(){return{time:{color:"grey",fontSize:"0.9rem"}}}));function De(){for(var e=Ne(),t=Object(K.c)((function(e){return e.loginUser})),n=Object(c.useState)([]),r=Object(b.a)(n,2),i=r[0],l=r[1],s=Object(c.useState)(!0),o=Object(b.a)(s,2),u=o[0],d=o[1],O=Object(c.useState)(!1),m=Object(b.a)(O,2),f=m[0],g=m[1],v=[],y=0;y<10;y++)v.push(Object(a.jsx)(j.a,{my:"10px",children:Object(a.jsx)(Ce.a,{variant:"rect",height:"60px",width:"100%"})}));Object(c.useEffect)((function(){we(M(),0,10).then((function(e){e.ok?e.json().then((function(e){l(e.logs);var t=e.total;g(e.logs.length<t),d(!1)})):d(!1)}))}),[]);var k=null;return Object(a.jsxs)(c.Fragment,{children:[Object(a.jsx)(p.a,{children:Object(a.jsx)("title",{children:"Aktivitas Pengguna SIPEMA"})}),Object(a.jsxs)(me,{loginUser:t,children:[Object(a.jsx)(ke,{icon:Object(a.jsx)(J.a,{fontSize:"large"}),title:"Log Aktivitas Pengguna"}),Object(a.jsxs)(j.a,{pl:{xs:0,lg:"100px"},mt:"50px",children:[Object(a.jsxs)(Te.a,{children:[i.map((function(t,n,r){var i=t.created,l=t.user.fullname,s=t.desc,o=t.user.pp,u=ye.a.unix(i).format("ll"),d=!1;return k!==u&&(k=u,d=!0),Object(a.jsxs)(c.Fragment,{children:[d?Object(a.jsx)(j.a,{my:"20px",children:Object(a.jsx)(Ue.a,{label:u})}):null,Object(a.jsxs)(Ie,{children:[Object(a.jsxs)(Ee.a,{children:[Object(a.jsx)(Pe.a,{}),r.length-1===n?null:Object(a.jsx)(Me.a,{})]}),Object(a.jsx)(Ae.a,{children:Object(a.jsxs)(j.a,{display:"flex",component:Be.a,elevation:3,p:"10px",children:[Object(a.jsxs)(j.a,{width:"100%",display:"flex",children:[Object(a.jsx)(j.a,{display:"flex",alignItems:"center",mr:"10px",children:Object(a.jsx)($.a,{src:o,children:l.charAt(0)})}),Object(a.jsx)(j.a,{display:"flex",alignItems:"center",children:Object(a.jsxs)(h.a,{children:[Object(a.jsx)("b",{children:l})," ",s]})})]}),Object(a.jsx)(j.a,{children:Object(a.jsx)(h.a,{className:e.time,children:ye.a.unix(i).format("LT")})})]})})]},t._id)]})})),u?v:null]}),!u&&f?Object(a.jsx)(j.a,{width:"100%",display:"flex",justifyContent:"center",pb:"50px",children:Object(a.jsx)(x.a,{color:"primary",onClick:function(){d(!0);var e=i.length-1;we(M(),e,10).then((function(e){e.ok?e.json().then((function(e){var t=e.total,n=i.slice();n=n.concat(e.logs),g(n.length<t),l(n),d(!1)})):d(!1)}))},children:"MUAT LEBIH BANYAK"})}):null]})]})]})}function Ge(){var e=Object(K.c)((function(e){return e.loginUser}));return Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(p.a,{children:Object(a.jsx)("title",{children:"Pengumuman SIPEMA"})}),Object(a.jsx)(me,{loginUser:e,children:Object(a.jsx)(ke,{icon:Object(a.jsx)(ue.a,{fontSize:"large"}),title:"Pengumuman"})})]})}var He=function(e,t,n,a){return S("".concat(f,"b/student/get/").concat(t,"/").concat(n,"/").concat(a),"GET",{token:e})},Le=function(e,t,n){return w("".concat(f,"b/student/set/").concat(t),"PUT",{token:e,"Content-Type":"application/json"},{approved:n})},Fe=Object(s.a)((function(e){return{avatar:{height:e.spacing(8),width:e.spacing(8),fontSize:"50px"},greyColor:{color:"grey"}}}));function We(e){var t=Fe(),n=Object(c.useState)(!1),r=Object(b.a)(n,2),i=r[0],l=r[1],s=e.student,o=s.user.pp,u=s.user.fullname;return Object(a.jsxs)(j.a,{component:Be.a,elevation:3,p:"10px",my:"10px",display:"flex",width:{xs:"100%",sm:"500px"},children:[Object(a.jsx)(j.a,{my:"auto",mr:"5px",children:Object(a.jsx)($.a,{className:t.avatar,src:o,children:u.charAt(0)})}),Object(a.jsxs)(j.a,{my:"auto",width:"100%",children:[Object(a.jsx)(h.a,{children:Object(a.jsx)("b",{children:u})}),Object(a.jsx)(h.a,{className:t.greyColor,children:"Murid"})]}),Object(a.jsx)(j.a,{display:"flex",alignContent:"center",children:Object(a.jsx)(x.a,{color:"primary",onClick:function(){l(!0),e.onAcc().then((function(e){e||l(!1)}))},disabled:i,children:i?"MENERIMA...":"TERIMA"})})]})}var Ke=n(183),ze=Object(s.a)((function(e){return{avatar:{height:e.spacing(8),width:e.spacing(8),fontSize:"50px"},greyColor:{color:"grey"}}}));function _e(e){var t=e.student,n=t.user.pp,r=t.user.fullname,i=ze(),l=Object(c.useState)(null),s=Object(b.a)(l,2),o=s[0],u=s[1],d=Object(c.useState)(!1),O=Object(b.a)(d,2),p=O[0],m=O[1];return Object(a.jsxs)(j.a,{component:Be.a,elevation:3,p:"10px",my:"10px",display:"flex",width:{xs:"100%",sm:"500px"},children:[Object(a.jsx)(j.a,{my:"auto",mr:"5px",children:Object(a.jsx)($.a,{className:i.avatar,src:n,children:r.charAt(0)})}),Object(a.jsxs)(j.a,{my:"auto",width:"100%",children:[Object(a.jsx)(h.a,{children:Object(a.jsx)("b",{children:r})}),Object(a.jsx)(h.a,{className:i.greyColor,children:"Murid"})]}),Object(a.jsxs)(j.a,{children:[Object(a.jsx)(N.a,{size:"small",onClick:function(e){u(e.currentTarget)},children:Object(a.jsx)(Ke.a,{size:"small"})}),Object(a.jsxs)(Q.a,{open:o,anchorEl:o,onClose:function(){u(null)},children:[Object(a.jsx)(X.a,{children:"Lihat Detil"}),Object(a.jsx)(X.a,{component:x.a,disabled:p,onClick:function(){m(!0),e.onKick().then((function(e){e||m(!1)}))},children:p?"MENENDANG...":"TENDANG"})]})]})]})}function Je(){var e=Object(K.c)((function(e){return e.loginUser})),t=Object(c.useState)(!0),n=Object(b.a)(t,2),i=n[0],l=n[1],s=Object(c.useState)(!0),o=Object(b.a)(s,2),u=o[0],d=o[1],O=Object(c.useState)([]),m=Object(b.a)(O,2),f=m[0],g=m[1],v=Object(c.useState)(!1),w=Object(b.a)(v,2),S=w[0],C=w[1],T=Object(c.useState)([]),E=Object(b.a)(T,2),P=E[0],A=E[1],R=Object(c.useState)(!1),U=Object(b.a)(R,2),B=U[0],I=U[1],N=Object(c.useState)(null),D=Object(b.a)(N,2),G=D[0],H=D[1];Object(c.useEffect)((function(){var e=M();He(e,0,3,!0).then((function(e){e.ok?e.json().then((function(e){var t=e.students,n=e.count;g(t),C(n>t.length),l(!1)})):l(!1)})),He(e,0,3,!1).then((function(e){e.ok?e.json().then((function(e){var t=e.students,n=e.count;A(t),I(n>t.length),d(!1)})):l(!1)}))}),[]);for(var L=[],F=0;F<3;F++)L.push(Object(a.jsx)(j.a,{my:"10px",width:{xs:"100%",sm:"500px"},mx:"auto",children:Object(a.jsx)(Ce.a,{variant:"rect",height:"60px"})}));return Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(p.a,{children:Object(a.jsx)("title",{children:"Manajemen Murid SIPEMA"})}),Object(a.jsxs)(me,{loginUser:e,children:[Object(a.jsx)(ke,{icon:Object(a.jsx)(de.a,{fontSize:"large"}),title:"Manajemen Murid"}),Object(a.jsxs)(j.a,{mt:"50px",children:[Object(a.jsxs)(j.a,{mb:"20px",children:[f.map((function(e,t){var n=e._id,c=e.user.fullname;return Object(a.jsx)(j.a,{display:"flex",justifyContent:"center",children:Object(a.jsx)(_e,{student:e,onKick:Object(k.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Le(M(),n,!1).then((function(e){if(e.ok){var n=P.length+1;He(M(),0,n,!1).then((function(e){e.ok?e.json().then((function(e){var t=e.count,n=e.students;A(n),I(n.length<t),d(!1)})):d(!1)})),A([]),d(!0);var a=f.slice();return a.splice(t,1),g(a),H("".concat(c," berhasil ditendang.")),!0}return H("Gagal menendang murid."),!1}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))},n)})})),i?L:f.length<=0?Object(a.jsx)(j.a,{mt:"20px",mb:"50px",children:Object(a.jsx)(h.a,{align:"center",gutterBottom:!0,children:"Murid Kosong."})}):null]}),S&&!i?Object(a.jsx)(j.a,{display:"flex",justifyContent:"center",alignContent:"center",children:Object(a.jsx)(x.a,{color:"primary",onClick:function(){var e=f.slice();l(!0),He(M(),e.length,3,!0).then((function(t){t.ok?t.json().then((function(t){var n=e.concat(t.students);g(n),C(n.length<t.count),l(!1)})):l(!1)}))},children:"MUAT LEBIH BANYAK"})}):null,Object(a.jsx)(j.a,{mt:"50px",children:Object(a.jsx)(h.a,{variant:"h5",gutterBottom:!0,children:"Murid yang Belum Disetujui"})}),Object(a.jsx)(ce.a,{}),Object(a.jsxs)(j.a,{mb:"20px",mt:"10px",children:[P.map((function(e,t){var n=e._id,c=e.user.fullname;return Object(a.jsx)(j.a,{display:"flex",justifyContent:"center",children:Object(a.jsx)(We,{student:e,onAcc:Object(k.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Le(M(),n,!0).then((function(e){if(e.ok){var n=f.length+1;g([]),l(!0),He(M(),0,n,!0).then((function(e){e.ok?e.json().then((function(e){var t=e.students,n=e.count;g(t),C(t.length<n),l(!1)})):l(!1)}));var a=P.slice();return a.splice(t,1),A(a),H("".concat(c," diterima menjadi murid.")),!0}return H("Gagal menerima murid"),!1}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))},n)})})),u?L:P.length<=0?Object(a.jsx)(j.a,{pb:"50px",mt:"20px",children:Object(a.jsx)(h.a,{gutterBottom:!0,align:"center",children:"Murid yang belum disetujui kosong."})}):null]}),B&&!u?Object(a.jsx)(j.a,{display:"flex",justifyContent:"center",alignContent:"center",pb:"50px",children:Object(a.jsx)(x.a,{color:"primary",onClick:function(){var e=P.slice();d(!0),He(M(),e.length,3,!1).then((function(t){t.ok?t.json().then((function(t){var n=e.concat(t.students);A(n),I(n.length<t.count),d(!1)})):d(!1)}))},children:"MUAT LEBIH BANYAK"})}):null]})]}),Object(a.jsx)(Z.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},message:G,open:G,autoHideDuration:6e3,onClose:function(){H(null)}},G)]})}function Ye(){var e=Object(K.c)((function(e){return e.loginUser}));return Object(a.jsx)(r.a.Fragment,{children:Object(a.jsx)(me,{loginUser:e,children:Object(a.jsx)(ke,{icon:Object(a.jsx)(be.a,{fontSize:"large"}),title:"Riwayat Pembayaran Murid"})})})}var qe=n(188),Ve=n(184);function $e(){var e=Object(K.c)((function(e){return e.loginUser})),t=Object(K.b)(),n=e.fullname,i=e.email,l=Object(c.useState)(null),s=Object(b.a)(l,2),o=s[0],u=s[1],d=Object(c.useState)(!1),h=Object(b.a)(d,2),p=h[0],m=h[1],g=r.a.createRef(),v=Object(c.useState)(null),y=Object(b.a)(v,2),k=y[0],S=y[1],C=function(){var a=g.current.value;u(null),a!==n&&(a.length<=0?u("Tidak boleh kosong."):(m(!0),function(e,t){return w("".concat(f,"b/user/profile/set"),"PUT",{"Content-Type":"application/json",token:e},{fullname:t})}(M(),a).then((function(n){n.ok?(e.fullname=a,t(z(e)),S("Berhasil mengedit profil anda.")):S("Gagal mengedit profil anda."),m(!1)}))))};return Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(j.a,{mt:"50px",children:Object(a.jsx)(O.a,{fullWidth:!0,label:"Nama Lengkap",placeholder:"Masukan nama lengkap anda...",defaultValue:n,error:o,helperText:o,inputRef:g,onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),C())}})}),Object(a.jsx)(j.a,{mt:"30px",mb:"50px",children:Object(a.jsx)(O.a,{fullWidth:!0,label:"Email",disabled:!0,value:i})}),Object(a.jsx)(j.a,{display:"flex",mb:"30px",flexDirection:"row-reverse",children:Object(a.jsx)(x.a,{color:"primary",variant:"contained",disabled:p,onClick:C,children:p?"MENGUBAH...":"UBAH"})}),Object(a.jsx)(Z.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},message:k,open:k,autoHideDuration:6e3,onClose:function(){S(null)}},k)]})}function Qe(){var e=Object(c.useState)(null),t=Object(b.a)(e,2),n=t[0],i=t[1],l=Object(c.useState)(null),s=Object(b.a)(l,2),o=s[0],u=s[1],d=Object(c.useState)(null),h=Object(b.a)(d,2),p=h[0],m=h[1],g=Object(c.useState)(!1),v=Object(b.a)(g,2),y=v[0],k=v[1],S=Object(c.useState)(null),C=Object(b.a)(S,2),T=C[0],E=C[1],P=Object(c.createRef)(),A=Object(c.createRef)(),R=Object(c.createRef)(),U=function(){i(null),m(null),u(null),E(null);var e,t,n,a=P.current.value,c=A.current.value,r=R.current.value;a.length<=0?i("Tidak boleh kosong."):c.length<8?u("Panjang minimal 8 karakter."):c!==r?(u("Harus sama."),m("Harus sama.")):(k(!0),(e=M(),t=a,n=c,w("".concat(f,"b/user/password/set"),"PUT",{"Content-Type":"application/json",token:e},{old_password:t,new_password:n})).then((function(e){e.ok?E("Berhasil mengganti password."):401===e.status?E("Password/token tidak valid."):500===e.status&&E("Terjadi masalah, mohon coba lagi nanti."),k(!1)})))};return Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(j.a,{mt:"50px",children:Object(a.jsx)(O.a,{fullWidth:!0,label:"Password Lama",placeholder:"Masukan password lama anda...",type:"password",error:n,helperText:n,inputRef:P,onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),U())}})}),Object(a.jsx)(j.a,{mt:"30px",mb:"50px",children:Object(a.jsx)(O.a,{fullWidth:!0,label:"Password Baru",placeholder:"Masukan password baru anda...",type:"password",inputRef:A,error:o,helperText:o,onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),U())}})}),Object(a.jsx)(j.a,{mt:"30px",mb:"50px",children:Object(a.jsx)(O.a,{fullWidth:!0,label:"Ulangi Password Baru",placeholder:"Masukan ulang password baru anda...",type:"password",inputRef:R,error:p,helperText:p,onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),U())}})}),Object(a.jsx)(j.a,{display:"flex",mb:"30px",flexDirection:"row-reverse",children:Object(a.jsx)(x.a,{color:"primary",variant:"contained",disabled:y,onClick:U,children:y?"MENGUBAH...":"UBAH"})}),Object(a.jsx)(Z.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},message:T,open:T,autoHideDuration:6e3,onClose:function(){E(null)}},T)]})}var Xe=Object(s.a)((function(e){return{pp:{height:e.spacing(15),width:e.spacing(15),fontSize:"80px"},inputContainer:{"& > *":{margin:e.spacing(1)}},input:{display:"none"},photoSizeDesc:{backgroundColor:he.a[100]},editProfileHeader:{backgroundColor:he.a[100]}}}));function Ze(){var e=Xe(),t=Object(K.c)((function(e){return e.loginUser})),n=Object(K.b)(),i=Object(c.useState)(!1),l=Object(b.a)(i,2),s=l[0],o=l[1],O=Object(c.useState)(null),m=Object(b.a)(O,2),g=m[0],v=m[1],y=t.fullname,k=t.role,w=t.pp,C=t.created,T=Object(c.useState)(window.location.pathname),E=Object(b.a)(T,2),P=E[0],A=E[1];return Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(p.a,{children:Object(a.jsx)("title",{children:"Profil SIPEMA"})}),Object(a.jsx)(me,{loginUser:t,children:Object(a.jsxs)(fe.a,{container:!0,direction:"row-reverse",spacing:2,children:[Object(a.jsx)(fe.a,{item:!0,xs:12,lg:4,children:Object(a.jsxs)(j.a,{component:Be.a,p:"20px",children:[Object(a.jsx)(h.a,{variant:"h4",gutterBottom:!0,align:"center",children:y}),Object(a.jsx)(h.a,{gutterBottom:!0,align:"center",children:"teacher"===k?"Guru":"Murid"}),Object(a.jsx)(j.a,{display:"flex",width:"100%",my:"20px",children:Object(a.jsx)(j.a,{mx:"auto",children:s?Object(a.jsx)(Ce.a,{height:"120px",width:"120px",variant:"circle"}):Object(a.jsx)($.a,{src:w,className:e.pp,children:y.charAt(0)})})}),Object(a.jsx)(j.a,{display:"flex",width:"100%",mb:"20px",children:Object(a.jsxs)(j.a,{mx:"auto",className:e.inputContainer,children:[Object(a.jsx)("input",{accept:"image/*",className:e.input,type:"file",id:"contained-button-file",onChange:function(e){var a=e.target.files[0];(a.size/1024/1024).toFixed(4)>=10?v("Ukuran foto tidak boleh melebihi 10 MB."):(o(!0),function(e,t){var n=new FormData;return n.append("photo",t),S("".concat(f,"b/user/profile/picture/set"),"PUT",{token:e},n)}(M(),a).then((function(e){e.ok?e.json().then((function(e){t.pp=e.pp,n(z(t)),o(!1),v("Berhasil mengganti foto profil.")})):(o(!1),v("Gagal mengganti foto profil."))})))}}),Object(a.jsx)("label",{htmlFor:"contained-button-file",children:Object(a.jsx)(x.a,{variant:"contained",color:"primary",component:"span",children:"GANTI FOTO PROFIL"})})]})}),Object(a.jsx)(j.a,{p:"10px",className:e.photoSizeDesc,mb:"20px",children:Object(a.jsxs)(h.a,{align:"center",children:["Ukuran foto maksimum: ",Object(a.jsx)("b",{children:"10 MB"})]})}),Object(a.jsx)(j.a,{mb:"20px",children:Object(a.jsxs)(h.a,{children:["Bergabung pada: ",Object(a.jsx)("b",{children:ye.a.unix(C).format("llll")})]})})]})}),Object(a.jsx)(fe.a,{item:!0,xs:12,lg:8,children:Object(a.jsxs)(j.a,{component:Be.a,children:[Object(a.jsxs)(j.a,{px:"20px",className:e.editProfileHeader,children:[Object(a.jsx)(j.a,{py:"40px",children:Object(a.jsx)(h.a,{variant:"h4",children:"Edit Profil"})}),Object(a.jsxs)(qe.a,{indicatorColor:"primary",value:P,onChange:function(e,t){A(t)},children:[Object(a.jsx)(Ve.a,{label:"Umum",component:u.b,to:"/profile",value:"/profile"}),Object(a.jsx)(Ve.a,{label:"Ganti Password",component:u.b,to:"/profile/password",value:"/profile/password"})]})]}),Object(a.jsx)(j.a,{p:"20px",children:Object(a.jsxs)(d.c,{children:[Object(a.jsx)(d.a,{path:"/profile/password",children:Object(a.jsx)(Qe,{})}),Object(a.jsx)(d.a,{path:"/profile",children:Object(a.jsx)($e,{})})]})})]})})]})}),Object(a.jsx)(Z.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},message:g,open:g,autoHideDuration:6e3,onClose:function(){v(null)}},g)]})}function et(){var e=Object(d.f)(),t=Object(K.b)(),n=Object(K.c)((function(e){return e.loginUser})),i=Object(c.useState)(!0),l=Object(b.a)(i,2),s=l[0],o=l[1];if(Object(c.useEffect)((function(){if(null===n){var a=M();null===a?e.push("/login"):(o(!0),function(e){return S("".concat(f,"b/user/profile"),"GET",{token:e})}(a).then((function(n){n.ok?n.json().then((function(e){t(z(e)),o(!1)})):e.push("/login")})))}}),[n,t,e]),s)return Object(a.jsx)(L,{});var j=null;return"student"===n.role?n.approved||(j=Object(a.jsx)(d.a,{path:"/",children:Object(a.jsx)(_,{})})):"teacher"===n.role&&(j=[Object(a.jsx)(d.a,{path:"/students",children:Object(a.jsx)(Je,{})}),Object(a.jsx)(d.a,{path:"/payment",children:Object(a.jsx)(Ye,{})}),Object(a.jsx)(d.a,{path:"/log",children:Object(a.jsx)(De,{})}),Object(a.jsx)(d.a,{path:"/profile",children:Object(a.jsx)(Ze,{})}),Object(a.jsx)(d.a,{path:"/",children:Object(a.jsx)(Ge,{})})]),Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(p.a,{children:Object(a.jsx)("title",{children:"SIPEMA"})}),Object(a.jsx)(d.c,{children:j})]})}n(112);ye.a.locale("id");var tt=Object(s.a)((function(){return{root:{backgroundColor:"white"}}}));var nt=function(){var e=tt();return Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(o.a,{}),Object(a.jsx)(j.a,{className:e.root,children:Object(a.jsx)(u.a,{children:Object(a.jsxs)(d.c,{children:[Object(a.jsx)(d.a,{path:"/login",children:Object(a.jsx)(U,{})}),Object(a.jsx)(d.a,{path:"/register/token/:token",children:Object(a.jsx)(F,{})}),Object(a.jsx)(d.a,{path:"/register",children:Object(a.jsx)(I,{})}),Object(a.jsx)(d.a,{path:"/password/reset/token/:token",children:Object(a.jsx)(W,{})}),Object(a.jsx)(d.a,{path:"/password/reset",children:Object(a.jsx)(G,{})}),Object(a.jsx)(d.a,{path:"/",children:Object(a.jsx)(et,{})}),Object(a.jsx)(d.a,{path:"*",children:Object(a.jsx)(B,{})})]})})})]})},at=n(51),ct=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOG_IN":return t.payload;case"LOG_OUT":return null;default:return e}},rt=Object(at.b)({loginUser:ct}),it=Object(at.c)(rt);l.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(K.a,{store:it,children:Object(a.jsx)(nt,{})})}),document.getElementById("root"))}},[[113,1,2]]]);