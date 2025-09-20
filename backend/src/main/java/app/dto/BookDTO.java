package app.dto;


import app.configs.FileConst;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;

@Getter @Setter
public class BookDTO {
    private long id;
    private String title;
    private float price;
    private int pages;
    private String isbn;
    private String nuart;
    private String note;
    private String summary;
    private String hook;
    private String marketing;
    private StatusDTO globalStatus;
    private Set<AuthorDTO> authors;
    private String coverFileName;

    public void setCoverFileName(String coverFileName) {
        if(coverFileName != null && !coverFileName.isEmpty())
        {
            this.coverFileName = FileConst.COVER_PATH + "/" + id + "/" + coverFileName;
        }
        else
        {
            this.coverFileName = null;
        }
    }

}
