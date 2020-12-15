
 var selection = d3.select("#selDataset");

 d3.json("samples.json").then((data) => {
    var subject_ID = data.names;

    subject_ID.forEach((subj) => {
        selection  
            .append("option")
            .text(subj)
            .property("value", subj);
    });

 // 1st value for default
 optionChanged(subject_ID[0]);

});

function optionChanged(new_id) {
    d3.json("samples.json").then((data) => {
        var subject_ID = data.names;
        // var top10 = data.samples[0].sample_values.slice(0,10).reverse();
        var results = data.samples.filter(sampleObj => sampleObj.id == new_id);
        var result = results[0];

        // var otu_ids = result.otu_ids
        //     .slice(0,10)
        //     .map((d) => `OTU ${d}`)
        //     .reverse();
        // var otu_labels = result.otu_labels;
        
        //trace for bar chart
        var traceBar = {
            x: result.sample_values.slice(0, 10).reverse(),
            y: result.otu_ids.slice(0, 10).map((d) => `OTU ${d}`).reverse(),
            type: "bar",
            text: result.otu_labels.slice(0, 10).reverse(),
            orientation: "h",
        };

        //layout for bar chart
        var layoutBar = {
            title: {
                text: `ID: ${results}`,
            },
            xaxis: {
                title: "Sample Values",
            },
            yaxis: {
                title: "Sample ID",
            },
        };

        var barPlot = [traceBar];

        Plotly.newPlot("bar", barPlot, layoutBar);

        // var results = top10.filter((sampleObj) => sampleObj.id == new_id);
        // console.log(results);
        // var result = results[0];
        // console.log(result);
        

        // var bubble_ids = result.otu_ids;
        // var bubble_labels = result.otu_labels;
        // var sample_values = result.sample_values;

        var bubble_trace = {
            x: result.otu_ids,
            y: result.sample_values,
            text: result.otu_labels,
            mode: "markers",
            marker: {
              size: result.sample_values,
              color:result.otu_ids,
              colorscale: "Earth",
            },
          };
      
          var bubble_data = [bubble_trace];
      
          var bubble_layout = {
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 },
          };
      
          Plotly.newPlot("bubble", bubble_data, bubble_layout);
        });


        d3.json("samples.json").then((data) => {
            var metadata = data.metadata;
        
            var results = metadata.filter(
              (metadataObj) => metadataObj.id == new_id
            );
            var result = results[0];
        
            var figure = d3.select("#sample-metadata");
        
            figure.html("");
        
            Object.entries(result).forEach(([key, value]) => {
              figure.append("h5").text(`${key}: ${value}`);
            });
          });
        } 