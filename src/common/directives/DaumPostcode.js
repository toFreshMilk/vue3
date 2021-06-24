

function insertLibrary() {
  const script = document.getElementById('daum_postcode_script');
  if (!script) {
    const src = document.createElement('script');
    src.setAttribute(
      'src',
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    );
    src.setAttribute('id', 'daum_postcode_script');
    document.head.appendChild(src);
  }
}

function openPostCode(vnode, binding) {
  new daum.Postcode({
    oncomplete: function (data) {
      let address = '';
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        // If the user selects a street name address
        address = data.roadAddress;
      } else {
        // When the user selects the local address (J)
        address = data.jibunAddress;
      }
      const jibun = data.jibunAddress;
      const road = data.roadAddress;

      if (data.userSelectedType === 'R') {
        // When the user selects the local address (J)
        address = data.roadAddress;
      } else {
        // When the user selects the local address (J)
        address = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
      }

      onCallback(vnode, binding, {
        postCode: data.zonecode, // This is the zip code data.
        address: address, // This is the address data.
        extraAddress: extraAddr, // if exists
        jibun: jibun,
        road: road,
      });
    },
  }).open();
}

function onCallback(vnode, binding, data) {
  vnode.context[binding.expression](data);
}

const directive = {
  inserted(el, binding, vnode) {
    insertLibrary();
    el.addEventListener('click', (e) => {
      e.preventDefault()
      openPostCode(vnode, binding);
    });
  },
};

export default directive;