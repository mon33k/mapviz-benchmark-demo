
# mapviz-benchmark-demo
Testing up to 100k nodes on a Vite web app using different map viz technologies. 

## Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:mon33k/mapviz-benchmark-demo.git
cd mapviz-benchmark-demo
npm install
npm run build
npm run dev 
```

## WIP github pages demo
https://mon33k.github.io/mapviz-benchmark-demo/?limit=1000

### What Works
- Base Map Loads, 100k node markers, limited link lines
- Benchmark Table
- very basic minimal Tailwind css


### What Doesn't Work / Still need to add
- Need to add link lines for 100k nodes 
- Benchmark Table reflects events directly related to the Map Layer you're on (adding that currently)
- Finished tabs for each map technology 
- optimized marker nodes - its fast but could be faster
