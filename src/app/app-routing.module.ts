import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { SearchComponent } from './components/search/search.component';
import { HashtagsComponent } from './components/hashtags/hashtags.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'post/:id', component: PostComponent},
  {path:'new-post', component: NewPostComponent},
  {path:'search/:search', component: SearchComponent},
  {path:'hashtags/:tag', component: HashtagsComponent},
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
