import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.scss']
})
export class UsercardComponent implements OnInit {

  @Input() post!: Post

  activeMT: boolean = false;

  activeMB: boolean = false;

  formT!: FormGroup

  formB!: FormGroup

  @Input() index!: number

  modal: boolean = false;

  @Output() customEvent= new EventEmitter()

  constructor(private post$: PostService, private fb: FormBuilder, private http: HttpClient) {
    this.formT = this.fb.group({
      title: ["", [Validators.required]],
    })
    this.formB = this.fb.group({
      body: ["", [Validators.required]],
    })
   }

  ngOnInit(): void {
  }

  dammiId(){
    this.post$.getPostId(this.post.id)
    console.log(this.post.id);
  }
  deletePost(){
    this.post$.deletePost(this.post.id)
    this.customEvent.emit(this.index)
    this.modal = false
  }
  clickModal(){
    this.modal = true
  }
  closeModal(){
    this.modal = false
  }
  modTitle(){
   this.http.patch('http://localhost:3000/api/posts/' + this.post.id, {"title":this.formT.controls['title'].value}).subscribe((res) => {
    console.log(res);
    this.post.title = this.formT.controls['title'].value
   })
   this.activeMT = false
  }

  modBody(){
    this.http.patch('http://localhost:3000/api/posts/' + this.post.id, {"body":this.formB.controls['body'].value}).subscribe((res) => {
     console.log(res);
     this.post.body = this.formB.controls['body'].value
    })
    this.activeMB = false
   }

  clickMT(){
    this.formT.controls['title'].setValue(this.post.title)
    if(this.activeMT == false){
      this.activeMT = true
    } else {
      this.activeMT = false
    }
  }

  clickMB(){
    this.formB.controls['body'].setValue(this.post.body)
    if(this.activeMB == false){
      this.activeMB = true
    } else {
      this.activeMB = false
    }
  }


}
