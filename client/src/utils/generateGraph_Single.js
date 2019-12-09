const generateGraph_Single = size => {
  let graph = {
    nodes: [],
    edges: []
  };

  let font = { vadjust: -40 };

  for (let i = 0; i < size; i++) {
    // graph.nodes.push({
    //   id: i,
    //   label: String.fromCharCode(96 + i),
    //   font: font
    // });
    graph.nodes.push({
      id: String.fromCharCode(65 + i),
      label: String.fromCharCode(65 + i),
      font: font
    });

    if (i >= 1) {
      let weight = Math.floor(Math.random() * 10) + 1;
      graph.edges.push({
        from: String.fromCharCode(65 + i - 1),
        to: String.fromCharCode(65 + i),
        label: weight
      });

      // graph.edges.push({
      //   from: i - 1,
      //   to: i + size,
      //   label: weight
      // });
    }
    // if (i >= 2) {
    //   if (Math.random() < 0.5) {
    //     let weight = Math.floor(Math.random() * 10) + 1;
    //     graph.edges.push({
    //       from: String.fromCharCode(65 + i - 2),
    //       to: String.fromCharCode(65 + i),
    //       label: weight
    //     });
    //     // graph.edges.push({
    //     //   from: i - 2 + size,
    //     //   to: i + size,
    //     //   label: weight
    //     // });
    //   }
    //
    //   // cross edges between two player's graphs
    //   // if (Math.random() < 0.35) {
    //   //   weight = Math.floor(Math.random() * 2) + 1;
    //   //   graph.edges.push({
    //   //     from: i,
    //   //     to: i + size,
    //   //     label: weight
    //   //   });
    //   // }
    // }

    // if (i >= 3 && Math.random() < 0.5) {
    //   let weight = Math.floor(Math.random() * 10) + 1;
    //   graph.edges.push({
    //     from: String.fromCharCode(65 + i - 3),
    //     to: String.fromCharCode(65 + i),
    //     label: weight
    //   });

    // graph.edges.push({
    //   from: i - 3 + size,
    //   to: i + size,
    //   label: weight
    // });

    // more connections with >3 distance]
    let weight = Math.floor(Math.random() * 10) + 1;
    // for (let j = i; j >= 1; j--){
    //   let dist = Math.floor(Math.random() * (j));
    //   if (dist <= i-j && Math.pow(Math.random() * j*0.0, 2) < dist) {
    //     graph.edges.push({
    //       from: String.fromCharCode(65 + i-dist),
    //       to: String.fromCharCode(65 + i),
    //       label: weight
    //     });
    //   }
    // }

    for (let dist = 2; dist <= i; dist++) {
      // if (dist > Math.pow(Math.random() * dist *size/6, 2)) {
      // let exp = 0.515 - size/1000;
      // let exp = 0.000002563*Math.pow(size, 2) - 0.001269*size + 0.1513;
      // let exp = 0.000007639*Math.pow(size, 2) - 0.002792*size + 0.2528;
      // let exp = 0.0000584*Math.pow(size, 2) - 0.001802*size + 1.268;
      // let exp = 0.0001213892592*Math.pow(size, 2) - 0.03068064814*size + 1.280559259;
      // let exp = 0.05;

      let exp = 0;

      // switch (true){
      //   case (size < 5): exp = 2; break;
      //   case (size < 7): exp = 0.9; break;
      //   case (size < 10): exp = 0.6; break;
      //   case (size < 15): exp = 0.3; break;
      //   case (size < 20): exp = 0.15; break;
      //   case (size < 25): exp = 0.10; break;
      //   case (size < 30): exp = 0.08; break;
      //   case (size < 35): exp = 0.07; break;
      //   case (size < 40): exp = 0.06; break;
      //   case (size < 45): exp = 0.05; break;
      //   case (size < 50): exp = 0.04; break;
      //   case (size < 55): exp = 0.035; break;
      //   case (size < 60): exp = 0.03; break;
      //   case (size < 70): exp = 0.025; break;
      //   case (size < 80): exp = 0.02; break;
      //   case (size < 90): exp = 0.015; break;
      //   default: exp = 0.01;
      // }

      switch (true) {
        case size < 5:
          exp = 10;
          break;
        case size < 7:
          exp = 3;
          break;
        case size < 10:
          exp = 1;
          break;
        case size < 15:
          exp = 0.5;
          break;
        case size < 20:
          exp = 0.3;
          break;
        case size < 25:
          exp = 0.22;
          break;
        case size < 30:
          exp = 0.2;
          break;
        case size < 35:
          exp = 0.17;
          break;
        case size < 40:
          exp = 0.16;
          break;
        case size < 45:
          exp = 0.15;
          break;
        case size < 50:
          exp = 0.12;
          break;
        case size < 55:
          exp = 0.1;
          break;
        case size < 60:
          exp = 0.07;
          break;
        case size < 70:
          exp = 0.065;
          break;
        case size < 80:
          exp = 0.06;
          break;
        case size < 90:
          exp = 0.055;
          break;
        default:
          exp = 0.05;
      }
      // console.log(size);

      // if (dist < Math.pow(Math.random() * Math.pow(size,exp) * 1, 1/exp)) {
      if (
        dist < size * Math.pow(Math.random() * 1, 1 / exp) &&
        dist < size * Math.pow(Math.random() * 1, 1 / exp)
      ) {
        graph.edges.push({
          from: String.fromCharCode(65 + i - dist),
          to: String.fromCharCode(65 + i),
          label: weight
        });
      }
    }

    // }
  }

  // let weight = Math.floor(Math.random() * 10) + 1;
  // graph.nodes.push({
  //   id: String.fromCharCode(65 + size),
  //   label: "FIN",
  //   font: font
  // });
  // graph.edges.push({
  //   from: String.fromCharCode(65 + size - 1),
  //   to: String.fromCharCode(65 + size),
  //   label: weight
  // });

  let weight = Math.floor(Math.random() * 10) + 1;
  graph.nodes.push({
    id: "FIN",
    label: "FIN",
    font: font
  });
  graph.edges.push({
    from: String.fromCharCode(65 + size - 1),
    to: "FIN",
    label: weight
  });

  // graph.edges.push({
  //   from: size - 1 + size,
  //   to: size * size,
  //   label: weight
  // });

  // console.log(size * size);
  return graph;
};

module.exports = generateGraph_Single;
