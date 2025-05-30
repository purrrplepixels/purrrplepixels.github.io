//preload capsules
for(const code of project_list) {
	const img = new Image();
	img.src = `assets/${code}/capsule.webp`;
}


	document.addEventListener('DOMContentLoaded', function() {
		const site_view = document.getElementById('view');
		const projects_section = document.getElementById('projects-section');
		const grid_section = document.getElementById('grid-section');
		const grid_title = document.getElementById('grid-title');
		const grid_button = document.getElementById('grid-button');
		
		const grid_container = document.getElementById('grid-container');
		const mobile_back = document.getElementById("mobile-back");

		let active_project = null;
		let push_state_id = 0;

		grid_button.addEventListener('click', ViewGrid);
		mobile_back.addEventListener('click', ViewGrid);
		

		for(const code of project_list) {
			const project = projects_data[code];
			// Create project-data element
			project.code = code;
			project.assets_path = `assets/${project.code}`;
			const proj_data = document.createElement('div');
			proj_data.className = 'project-data';
			proj_data.setAttribute('data-code', project.code);
			
			// Create grid item
			const g_item = document.createElement('div');
			g_item.className = 'grid-item';
			g_item.style.backgroundImage = `url(/loading.webp)`;
			g_item.setAttribute('data-project-code', project.code);
			g_item.title = project.title;
			{
				const img = new Image();
				img.src = `${project.assets_path}/capsule.webp`;
				img.onload = () => {
					g_item.style.backgroundImage = `url(${project.assets_path}/capsule.webp)`;
				}
				img.onerror = () => {
					g_item.style.backgroundImage = `url(/not-found.webp)`;
				}
			}
			
			g_item.addEventListener('click', function() {
				ViewProject(project.code);
			});
			
			
			grid_container.appendChild(g_item);
			//appending
			projects_section.appendChild(proj_data);
			project["grid-item"] = g_item;
			project["project-data"] = proj_data;
		};
		
		function enter_grid_view() {
			site_view.classList.remove('project-view');
			site_view.classList.add('grid-view');
			mobile_back.classList.remove('show');
			
			document.querySelectorAll('.grid-item.active').forEach(item => {
				item.classList.remove('active');
			});
			document.querySelectorAll('.project-data.active').forEach(e => e.classList.remove('active'));
			
		}
		function enter_project_view(code) {
				const project = load_project(code);
				if(!project) return ViewGrid();
				
				window.scroll({top: 0, left: 0, behavior: "smooth"});
				//document.querySelectorAll('.project-data.active').forEach(e => e.classList.remove('active'));
				if(active_project) active_project['project-data'].classList.remove('active');
				project['project-data'].classList.add('active');
				
				site_view.classList.add('project-view');
				site_view.classList.remove('grid-view');
				mobile_back.classList.add('show');
				
				if(active_project) active_project["grid-item"].classList.remove("active");
				project["grid-item"].classList.add("active");
				
				requestAnimationFrame(() => {
					window.scroll({top: 0, left: 0, behavior: "instant"});
				});
				active_project = project;
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
				p_capsule_img.src = `${project.assets_path}/capsule.webp`;
				p_capsule_img.alt = 'capsule';
				p_capsule.appendChild(p_capsule_img);
				p_capsule_img.onload = () => {
					p_capsule.classList.remove("loading");
					project.gallery.push(p_capsule_img.src); // add capsule to lightbox
					p_capsule_img.onclick = (e) => openLightbox(e,project.gallery.length-1,project.gallery, project.assets_path);
				}
				p_capsule_img.onerror = () => {
					p_capsule_img.onload = null; // avoid call onload again
					p_capsule_img.src = `/not-found.webp`;
					p_capsule.classList.remove("loading");
					p_capsule.classList.add("error");
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


				
				


				for (let i = 0; i < project.gallery.length; i++) {

					const g_item = gallery.appendChild(document.createElement('div'));
					g_item.className = 'gallery-item loading';
					const g_img = new Image();
					g_img.src = `${project.assets_path}/${project.gallery[i]}`;
					g_img.alt = `Item ${i}`;
					g_item.appendChild(g_img);
					g_img.onload = () => {
						g_item.classList.remove("loading");
						g_img.onclick = (e) => openLightbox(e,i, project.gallery,project.assets_path);
					}
					g_img.onerror = () => {
						g_img.onload = null; // avoid call onload again
						g_img.src = `/not-found.webp`;
						g_item.classList.remove("loading");
						g_item.classList.add("error");
					}
				}
				
				project.loaded = true;
			
				return project;

 
		}    

/*     
		function set_hash(code) {
			const url = new URL(window.location.href);
			const state = { hash: code, id: push_state_id++, };
			window.history.pushState(state,null,`#${code}`);
			console.log("Push: ", state);
		}

		window.addEventListener('popstate', (event) => {
			console.log("Pop: ",event.state);
			if(!event.state.hash) enterViewGrid(false);
			else enterViewProject(event.state.hash,false);
		});

		// load starting view
		{
			const start_state = { hash: location.hash, id: push_state_id++, };
			if(!location.hash) enterViewGrid(false);
			else enterViewProject(location.hash.substring(1,false));
			window.history.replaceState(start_state,null,this.location.hash);
		} 
*/


		window.addEventListener('hashchange', on_hash_change);

		function on_hash_change() {
				const hash = window.location.hash;
				if(!hash) enter_grid_view();
				else enter_project_view(hash.substring(1));
		}
		function set_hash(hash = '')
		{
				window.location.hash = hash;
		}
		function ViewGrid() {
				set_hash('');
		}
		function ViewProject(code) {
				set_hash(code);
		}

		on_hash_change();
		
 

		
		window.ViewProject = ViewProject;
		window.ViewGrid = ViewGrid;
	});