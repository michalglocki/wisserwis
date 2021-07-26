package pl.mglocki.wisseriws;

import javax.persistence.Cacheable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Cacheable
@Table(name="details")
@Cache(usage=CacheConcurrencyStrategy.READ_WRITE)
public class Details {
	@Id
	private int id;
	
	private String title;
	private String picture;
	private String text;
	private String movie;
	private String belongs;
	private String button;
	private int menuid;
	private int single;
	
	
	
	public Details() {
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getMovie() {
		return movie;
	}
	public void setMovie(String movie) {
		this.movie = movie;
	}
	public String getBelongs() {
		return belongs;
	}
	public void setBelongs(String belongs) {
		this.belongs = belongs;
	}
	public String getButton() {
		return button;
	}
	public void setButton(String button) {
		this.button = button;
	}
	
	public int getSingle() {
		return single;
	}
	public void setSingle(int single) {
		this.single = single;
	}
	
	public int getMenuid() {
		return menuid;
	}
	public void setMenuid(int menuid) {
		this.menuid = menuid;
	}
	@Override
	public String toString() {
		return "Details [id=" + id + ", title=" + title + ", picture=" + picture + ", text=" + text + ", movie=" + movie
				+ ", belongs=" + belongs + ", button=" + button + ", single=" + single + "]";
	}


	
}
