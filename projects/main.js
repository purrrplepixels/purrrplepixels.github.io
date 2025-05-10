const projects_data = {
  colorbynumber: {
    title: "Color By Number",
    info: {
      "Project": "Color By Number",
      "Client": "Wild Life Studios",
      "Summary":"Designed and delivered thousands of pixel art assets, from concept to animation, consistently ensuring cute aesthetics.",
      "Services":
      [
        "Pixel Art Characters and Backgrounds",
        "Pixel Art Animation",
        "Concept Art"
      ],
    },
    gallery_size: 13,
  },
  gobutiko: {
    title: "Gobutiko",
    info: {
      "Project": "Gobutiko",
      "Client": "Outstandly",
      "Services":
      [
        "Characters Concept Art ",
        "Pixel Art Sprites and Animations",
        "Pixel Art Props and Tilesets",
        "Game Logo Design",
        "Steam Capsule Artwork",
      ],
    },
    gallery_size: 9,
  },
  streamraiders: {
    title: "Stream Raiders",
    info: {
      "Project": "Stream Raiders",
      "Client": "Outstandly",
      "Services":
      [
        "Pixel Art Characters",
        "Pixel Art Animation",
      ],
    },
    gallery_size: 8,
  },
  arenakingdoms: {
    title: "Arena Kingdoms",
    info: {
      "Project": "Arena Kingdoms",
      "Client": "Outstandly",
      "Services":
      [
        "Pixel Art Characters",
        "Pixel Art Animation",
      ],
    },
    gallery_size: 3,
  },
  undeadissues: {
    title: "Undead Issues",
    info: {
      "Project": "Undead Issues Survivor (In Development)",
      "Client": "@ntngamedev",
      "Services":
      [
        "Characters Concept Art ",
        "Pixel Art Sprites and Animations",
        "Pixel Art Props and Tilesets",
        "Game Logo Design",
        "Steam Capsule Artwork",
      ],
    },
    gallery_size: 9,
  },
  
};


for(const [code,project] of Object.entries(projects_data)) {
  const img = new Image();
  img.src = `assets/${project.code}/capsule.webp`;
}


  document.addEventListener('DOMContentLoaded', function() {
    const site_view = document.getElementById('view');
    const projects_container = document.getElementById('projects-container');
    const grid = document.getElementById('grid');
    const grid_title = document.getElementById('grid-title');
    const grid_container = document.getElementById('grid-container');
    const mobile_back = document.querySelector(".mobile-back");

    let active_project = null;
    
    // Create project elements from projectsData
    for(const [code,project] of Object.entries(projects_data)) {
      // Create project-data element
      project.code = code;
      const proj_data = document.createElement('div');
      proj_data.className = 'project-data';
      proj_data.setAttribute('data-code', project.code);
      
      // Create grid item
      const g_item = document.createElement('div');
      g_item.className = 'grid-item';
      g_item.style.backgroundImage = `url(assets/${project.code}/capsule.webp),url(/loading.webp)`;
      g_item.setAttribute('data-project-code', project.code);
      g_item.title = project.title;
      
      g_item.addEventListener('click', function() {
        setActiveProject(project.code);
      });
      
      
      grid_container.appendChild(g_item);
      //appending
      projects_container.appendChild(proj_data);
      project["grid-item"] = g_item;
      project["project-data"] = proj_data;
    };
    
    if(!location.hash) enterGridView();
    else setActiveProject(location.hash.substring(1));
    
    function enterGridView() {
      set_hash('');
      site_view.classList.remove('project-view');
      site_view.classList.add('grid-view');
      mobile_back.classList.remove('show');
      grid_title.removeEventListener('',enterGridView)
      
      document.querySelectorAll('.grid-item.active').forEach(item => {
        item.classList.remove('active');
      });
      document.querySelectorAll('.project-data.active').forEach(e => e.classList.remove('active'));
      
      grid_title.textContent = "Projects";
    }
    
    
    function load_project(code)
    {
        const project = projects_data[code];
        if(!project) return null;

        //const proj_data = document.querySelector(`.project-data[data-code="${code}"]`);
        const proj_data = project["project-data"];
        //if(!proj_data) return null;
        
        if(project.loaded) return project;
        
        //project-card
        const p_card = proj_data.appendChild(document.createElement('div'));
        p_card.className = 'project-card';
        
        const p_capsule = p_card.appendChild(document.createElement('div'));
        p_capsule.className = 'project-capsule loading';
        
        
        const p_capsule_img = new Image();
        p_capsule_img.src = `assets/${project.code}/capsule.webp`;
        p_capsule_img.alt = 'capsule';
        p_capsule.appendChild(p_capsule_img);
        p_capsule_img.onload = () => {
          p_capsule.classList.remove("loading");
          p_capsule_img.onclick = (e) => openLightbox(e,project.gallery_size, g_image_arr); //works because hoisting

        }
        
        const p_info = p_card.appendChild(document.createElement('div'));
        p_info.className = 'project-info';

        for(const [item_label,item_values] of Object.entries(project.info)) {
          const pi_item = p_info.appendChild(document.createElement('item'));
          const pi_ilabel = pi_item.appendChild(document.createElement('ilabel'));
          pi_ilabel.textContent = item_label;
          if(Array.isArray(item_values)) item_values.forEach(element => { add_ivalue(element);});
          else add_ivalue(item_values);


          function add_ivalue(element){
            const pi_ivalue = pi_item.appendChild(document.createElement('ivalue'));
            pi_ivalue.textContent = element;
          }
        
        }

        // const p_title = p_info.appendChild(document.createElement('div'));
        // p_title.className = 'project-title';
        // p_title.textContent = project.title;
        
        // const p_desc = p_info.appendChild(document.createElement('div'));
        // p_desc.className = 'project-description';
        // p_desc.innerHTML = project.description;
        
        // if(project.link)
        // {
        //     const p_link = p_card.appendChild(document.createElement('div'));
        //     p_link.className = 'project-link';
        //     const p_link_anchor = p_link.appendChild(document.createElement('a'));
        //     p_link_anchor.href = project.link;
        //     p_link_anchor.target = '_blank';
        //     p_link_anchor.textContent = 'View More';
        // }
        
        //gallery
        const proj_gallery = proj_data.appendChild(document.createElement('div'));
        proj_gallery.className = 'project-gallery';
        
        const gallery = proj_gallery.appendChild(document.createElement('div'));
        gallery.className = 'gallery';
        gallery.id = `gallery-${project.code}`;

        const g_image_arr = Array.from({length: project.gallery_size}, (_, i) => 
            `assets/${project.code}/item_${String(i).padStart(3, '0')}.webp`
        );
        g_image_arr.push(`assets/${project.code}/capsule.webp`);
        
        


        for (let i = 0; i < project.gallery_size; i++) {

          const g_item = gallery.appendChild(document.createElement('div'));
          g_item.className = 'gallery-item loading';
          const g_img = new Image();
          g_img.src = g_image_arr[i];
          g_img.alt = `Item ${i}`;
          g_item.appendChild(g_img);
          g_img.onload = () => {
            g_item.classList.remove("loading");
            g_img.onclick = (e) => openLightbox(e,i, g_image_arr);
            
          }
        }
        
        project.loaded = true;
      
        return project;

 
    }

    function setActiveProject(code) {
        const project = load_project(code);
        if(!project) return enterGridView();
        set_hash(code); 
        
        //document.querySelectorAll('.project-data.active').forEach(e => e.classList.remove('active'));
        if(active_project) active_project['project-data'].classList.remove('active');
        project['project-data'].classList.add('active');
        
        site_view.classList.add('project-view');
        site_view.classList.remove('grid-view');
        mobile_back.classList.add('show');
        grid_title.addEventListener('click', enterGridView);
        grid_title.textContent = "<< View All";
        
        if(active_project) active_project["grid-item"].classList.remove("active");
        project["grid-item"].classList.add("active");
        
        active_project = project;

        
        
    }

    function set_hash(code) {
      const url = new URL(window.location.href);
      url.hash = code;
      window.history.replaceState(null,null, url.toString());
    }
    
    window.setActiveProject = setActiveProject;
    window.enterGridView = enterGridView;
  });