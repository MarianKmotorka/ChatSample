using Microsoft.EntityFrameworkCore.Migrations;

namespace ChatSampleApi.Persistence.Migrations
{
    public partial class ChatRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "ChatUsers",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "ChatUsers");
        }
    }
}
